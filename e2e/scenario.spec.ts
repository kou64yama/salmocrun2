import { test, expect } from "@playwright/test";
test("実画像を選択して認識する", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "canShare", { value: () => true });
    Object.defineProperty(navigator, "share", {
      value: async (data: ShareData) => {
        (window as unknown as { shared: unknown }).shared = {
          text: data.text,
          name: data.files?.[0]?.name,
        };
      },
    });
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "シナリオコードを読み取る" }),
  ).toBeVisible();
  await page
    .getByTestId("image-input")
    .setInputFiles("tests/fixtures/SHQ4-PVS6-ALNL-VA6D.jpg");
  await expect(page.getByText("シナリオコード", { exact: true })).toBeVisible({
    timeout: 90000,
  });
  await expect(page.locator(".code")).not.toBeEmpty();
  await expect(
    page.getByRole("img", { name: "選択したバイトシナリオ画像" }),
  ).toBeVisible();
  const candidate = await page.locator(".code").innerText();
  console.log(`正解: SHQ4-PVS6-ALNL-VA6D / 認識候補: ${candidate}`);
  await page.getByTestId("share").click();
  expect(
    await page.evaluate(
      () => (window as unknown as { shared: unknown }).shared,
    ),
  ).toEqual({ text: candidate, name: "SHQ4-PVS6-ALNL-VA6D.jpg" });
});

test("認識失敗から再試行し形式不一致を表示して選び直せる", async ({ page }) => {
  await page.route("**/src/recognition.ts*", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: `let attempts = 0;
export async function recognize(file) {
  if (file.name === 'failure.jpg' && attempts++ === 0) throw new Error('failed');
  return file.name === 'failure.jpg' ? {text: 'invalid-code', valid: false} : {text: 'SHQ4-PVS6-ALNL-VA6D', valid: true};
}`,
    });
  });
  await page.goto("/");
  const input = page.getByTestId("image-input");
  await input.setInputFiles({
    name: "failure.jpg",
    mimeType: "image/jpeg",
    buffer: Buffer.from("test"),
  });
  await expect(
    page.getByText("読み取りに失敗しました。再試行してください。"),
  ).toBeVisible();
  await page.getByTestId("retry").click();
  await expect(
    page.getByText(
      "コードの形式が一致しません。画像と照らし合わせてください。",
    ),
  ).toBeVisible();
  await input.setInputFiles({
    name: "replacement.jpg",
    mimeType: "image/jpeg",
    buffer: Buffer.from("test"),
  });
  await expect(page.locator(".code")).toHaveText("SHQ4-PVS6-ALNL-VA6D");
  await expect(
    page.getByText(
      "コードの形式が一致しません。画像と照らし合わせてください。",
    ),
  ).toHaveCount(0);
  await input.setInputFiles({
    name: "wrong.png",
    mimeType: "image/png",
    buffer: Buffer.from("test"),
  });
  await expect(
    page.getByText("JPEG 画像を選択してください。", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code")).toHaveCount(0);
});
