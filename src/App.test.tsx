import { afterEach, describe, expect, it, vi } from "vitest";
import {
  render as baseRender,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import type { ReactElement } from "react";
const render = (element: ReactElement) =>
  baseRender(<MantineProvider>{element}</MantineProvider>);
URL.createObjectURL = vi.fn(() => "blob:test");
URL.revokeObjectURL = vi.fn();
window.matchMedia = vi.fn().mockImplementation(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));
import App from "./App";
vi.mock("./recognition", () => ({ recognize: vi.fn() }));
import { recognize } from "./recognition";
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
describe("画面", () => {
  it("画像選択を示す", () => {
    render(<App />);
    expect(screen.getByLabelText("画像を選択")).toBeInTheDocument();
  });
  it("JPEG 以外を拒否する", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("画像を選択"), {
      target: { files: [new File(["x"], "x.png", { type: "image/png" })] },
    });
    expect(screen.getByRole("alert")).toHaveTextContent("JPEG");
  });
  it("認識結果を表示する", async () => {
    vi.mocked(recognize).mockResolvedValue({
      text: "SHQ4-PVS6-ALNL-VA6D",
      valid: true,
    });
    render(<App />);
    fireEvent.change(screen.getByLabelText("画像を選択"), {
      target: { files: [new File(["x"], "x.jpg", { type: "image/jpeg" })] },
    });
    expect(await screen.findByText("SHQ4-PVS6-ALNL-VA6D")).toBeInTheDocument();
  });
  it("空結果を通知する", async () => {
    vi.mocked(recognize).mockResolvedValue(null);
    render(<App />);
    fireEvent.change(screen.getByLabelText("画像を選択"), {
      target: { files: [new File(["x"], "x.jpg", { type: "image/jpeg" })] },
    });
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "読み取れません",
    );
  });
  it("形式不一致を警告", async () => {
    vi.mocked(recognize).mockResolvedValue({ text: "BAD", valid: false });
    render(<App />);
    fireEvent.change(screen.getByLabelText("画像を選択"), {
      target: { files: [new File(["x"], "x.jpg", { type: "image/jpeg" })] },
    });
    expect(await screen.findByRole("alert")).toHaveTextContent("形式");
  });
  it("認識エラーで再試行", async () => {
    vi.mocked(recognize)
      .mockRejectedValueOnce(Error())
      .mockResolvedValue({ text: "ABC", valid: false });
    render(<App />);
    fireEvent.change(screen.getByLabelText("画像を選択"), {
      target: { files: [new File(["x"], "x.jpg", { type: "image/jpeg" })] },
    });
    fireEvent.click(await screen.findByText("再試行"));
    await waitFor(() => expect(recognize).toHaveBeenCalledTimes(2));
  });
});
