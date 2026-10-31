# テスト指示

## 実行コマンド

依存関係を `npm ci` で準備し、Unit のテストを `npx vitest run src/recognition.test.ts src/share.test.ts src/App.test.tsx` で実行する。ブラウザ検証は `PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npx playwright test e2e/scenario.spec.ts` を実行する。Chromium の準備は `PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npx playwright install chromium`。ポート 4173 の既存プレビューは実行前に停止する。全体の行カバレッジ 80% は `npm run coverage` で確認する。

認識処理をカバレッジに含めて全対象の行カバレッジ 80% 以上を検証する。整形・静的検査を CI で実行し、実画像の認識候補と正解の比較を記録する。Playwright ブラウザの準備手順を記載し、検査を再実行する。

Vitest と testing-library で認識、共有、画面の各部品を単体検証し、重要な境界の結合検証を行う。Playwright で画像選択から認識と共有までの一連の動作と、失敗・形式不一致・選び直しを検証する。提供画像 `tests/fixtures/SHQ4-PVS6-ALNL-VA6D.jpg` と正解コードを使用する。対象 Chrome で PWA の導入も確認する。

各対象層は失敗するテストとその実行結果を先に記録し、最小限の実装で通した後に整理する。行カバレッジ 80% 以上、型検査、ビルド、CI 実行を確認する。コマンドはプロジェクトの設定後に確定し、実行できない検査は理由を記録する。
