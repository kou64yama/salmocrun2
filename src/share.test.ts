import { describe, it, expect, vi } from "vitest";
import { canShare, share, copy } from "./share";
describe("共有", () => {
  const file = new File(["x"], "a.jpg", { type: "image/jpeg" });
  it("画像共有可能なら true", () => {
    expect(
      canShare(file, {
        share: vi.fn(),
        canShare: () => true,
      } as unknown as Navigator),
    ).toBe(true);
  });
  it("API 不在なら false", () => {
    expect(canShare(file, {} as Navigator)).toBe(false);
  });
  it("検査が例外でも false", () => {
    expect(
      canShare(file, {
        share: vi.fn(),
        canShare: () => {
          throw Error();
        },
      } as unknown as Navigator),
    ).toBe(false);
  });
  it("画像とコードを渡す", async () => {
    const fn = vi.fn().mockResolvedValue(undefined);
    expect(
      await share(file, "ABC", { share: fn } as unknown as Navigator),
    ).toBe("shared");
    expect(fn).toHaveBeenCalledWith({ files: [file], text: "ABC" });
  });
  it("キャンセルを区別", async () => {
    expect(
      await share(file, "a", {
        share: vi.fn().mockRejectedValue(new DOMException("", "AbortError")),
      } as unknown as Navigator),
    ).toBe("cancelled");
  });
  it("コピーを実行", async () => {
    const fn = vi.fn().mockResolvedValue(undefined);
    await copy("abc", { clipboard: { writeText: fn } } as unknown as Navigator);
    expect(fn).toHaveBeenCalledWith("abc");
  });
});
