# TDD 実行記録

- Red: `npm test -- src/recognition.test.ts` は `Failed to resolve import "./recognition"` で失敗（実装前）。
- Red: `npm test -- src/share.test.ts` は `Failed to resolve import "./share"` で失敗（実装前）。
- Red: `npm test -- src/App.test.tsx` は `Failed to resolve import "./App"` で失敗（実装前）。
- Green: `npm run coverage` は 20 テスト成功、行カバレッジ 90.9%。 `npm run build` は成功。
- 実画像: `PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npm run e2e` は実ブラウザ・実 OCR・共有 API スタブによる画像と結果の引き渡しを通過。通常サンドボックスでは Chrome 起動時に `bootstrap_check_in ... Permission denied` が発生し、承認された外部実行で再実行した。
- 認識例: 正解 `SHQ4-PVS6-ALNL-VA6D` に対し実 OCR は `SHQY-PVS6-ALNL-VAGD` を返した。形式には一致するが 2 文字が異なる。精度目標は未設定で、形式一致は正解を保証しない。
- 実行できていない項目: 実際の OS 共有先とスマートフォンでのインストール・起動、WCAG 2.2 AA の全達成基準、GitHub Actions の実行結果は未検証。
- `npm audit --omit=dev` は脆弱性 0 件。開発依存には低リスクの指摘 4 件が残る。
