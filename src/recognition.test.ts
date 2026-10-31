import { describe, it, expect, vi } from "vitest";
const worker = vi.hoisted(() => ({
  setParameters: vi.fn(),
  recognize: vi.fn(),
  terminate: vi.fn(),
}));
vi.mock("tesseract.js", () => ({
  createWorker: vi.fn(async () => worker),
  PSM: { SINGLE_LINE: "7" },
}));
import { parseCandidate, cropBounds, recognize } from "./recognition";
describe("認識結果", () => {
  it("空白を除いてコードを判定", () =>
    expect(parseCandidate(" SHQ4-PVS6-ALNL-VA6D\n")).toEqual({
      text: "SHQ4-PVS6-ALNL-VA6D",
      valid: true,
    }));
  it("空は失敗", () => expect(parseCandidate(" \n ")).toBeNull());
  it("不正な候補も保持", () =>
    expect(parseCandidate("ABC")?.valid).toBe(false));
  it("禁止文字を拒否", () =>
    expect(parseCandidate("SIQ4-PVS6-ALNL-VA6D")?.valid).toBe(false));
  it("小文字を正規化しない", () =>
    expect(parseCandidate("shq4-pvs6-alnl-va6d")?.valid).toBe(false));
  it("画像寸法に合わせて右下を切り出す", () =>
    expect(cropBounds(1920, 1080)).toEqual({
      x: 1480,
      y: 900,
      width: 375,
      height: 50,
    }));
  it("領域を認識し worker を終了する", async () => {
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn().mockResolvedValue({ width: 1920, height: 1080, close: vi.fn() }),
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
    worker.recognize.mockResolvedValue({
      data: { text: "SHQ4-PVS6-ALNL-VA6D" },
    });
    expect(await recognize(new File(["x"], "x.jpg"))).toEqual({
      text: "SHQ4-PVS6-ALNL-VA6D",
      valid: true,
    });
    expect(worker.terminate).toHaveBeenCalled();
  });
  it("キャンバスが使えない場合は失敗", async () => {
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn().mockResolvedValue({ width: 1, height: 1, close: vi.fn() }),
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    await expect(recognize(new File(["x"], "x.jpg"))).rejects.toThrow();
  });
});
