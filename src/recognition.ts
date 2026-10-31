import { createWorker, PSM } from "tesseract.js";
export const pattern =
  /^S[0-9A-HJ-NP-Z]{3}-[0-9A-HJ-NP-Z]{4}-[0-9A-HJ-NP-Z]{4}-[0-9A-HJ-NP-Z]{4}$/;
export function parseCandidate(raw: string) {
  const text = raw.trim();
  return text ? { text, valid: pattern.test(text) } : null;
}
export function cropBounds(width: number, height: number) {
  return {
    x: Math.round((width * 1480) / 1920),
    y: Math.round((height * 900) / 1080),
    width: Math.round((width * 375) / 1920),
    height: Math.round((height * 50) / 1080),
  };
}
export async function recognize(file: File) {
  const bitmap = await createImageBitmap(file);
  const { x, y, width, height } = cropBounds(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = width * 3;
  canvas.height = height * 3;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("画像を読み込めませんでした");
  }
  ctx.drawImage(bitmap, x, y, width, height, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const base = import.meta.env.BASE_URL;
  const worker = await createWorker("eng", 1, {
    workerPath: `${base}ocr/worker.min.js`,
    corePath: `${base}ocr/`,
    langPath: `${base}ocr/`,
    cacheMethod: "none",
  });
  try {
    await worker.setParameters({
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-",
      tessedit_pageseg_mode: PSM.SINGLE_LINE,
    });
    const result = await worker.recognize(canvas);
    return parseCandidate(result.data.text);
  } finally {
    await worker.terminate();
  }
}
