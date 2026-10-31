# 結合検証手順

`PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npx playwright install chromium` で準備し、ポート 4173 の既存サーバーを停止して `PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npx playwright test e2e/scenario.spec.ts` を実行する。実画像 `tests/fixtures/SHQ4-PVS6-ALNL-VA6D.jpg` を使う。共有 API はテストでスタブされるため OS 共有先は別途確認する。
