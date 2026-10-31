# ビルドとテストの概要

入力: `construction/u1-scenario-pwa/code-generation/code-generation-plan.md`、`unit-test-instructions.md`、`code-summary.md`。詳細は `test-results.md` と `integration-test-instructions.md`。

## Target Verification Matrix

| Target ID | Source | Expected | Actual | Evidence | Owning Stage | Verdict |
|---|---|---|---|---|---|---|
| coverage | code-generation-plan.md Testing Contract | 全体行 80%以上 | 86.51% | checkpoint 検証の npm run coverage | build-and-test | Met |
| NFR1.1 | nfr-requirements/security-requirements.md | 共有以外で画像・候補を送信しない | 実画像認識中の HTTP 通信を Chromium で検査 | tests/README.md、e2e/scenario.spec.ts | build-and-test | Met |
| NFR3.1 | nfr-requirements/security-requirements.md | 終了後も履歴保存なし | 再読み込み時の画面と一部保存領域を検査、アプリ終了後は未検査 | tests/README.md | build-and-test | Unverified |
| NFR2.1 | nfr-requirements/performance-requirements.md | 安定版 Chrome のスマートフォン・デスクトップで一連の操作、環境記録 | デスクトップでインストール画面を確認、スマートフォンと全操作・バージョンは未確認 | code-summary.md | build-and-test | Unverified |
| CI | code-generation-plan.md Testing Contract | マージ前 CI | 成功した過去の実行あり | GitHub Actions 41156318756、41156306156 | ci-pipeline | N/A |

未確認項目があるため、現時点では検証完了としない。実画像の認識候補は正解と2文字異なるが、精度の数値目標は設定されていない。
