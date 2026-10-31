# 技術と品質要件

入力: [機能仕様](../functional-design/functional-spec.md)、[要件](../../../inception/requirements-analysis/requirements.md)。

- 指定技術: Vite、React、React Router、Mantine UI、Tesseract.js、Vitest、testing-library、Playwright。ブラウザ内で認識と画面を実装し、テスト先行で検証する。
- **NFR4.1** 画像選択・共有・コピーをキーボードで操作でき、状態と結果を読み上げで確認できる。WCAG 2.2 AA を目標とし、達成基準ごとに手動・自動検査の結果を記録する。
- **NFR5.1** 対象 Chrome で PWA をインストールし、ホーム画面またはアプリ一覧から起動できることを確認する。
- 各テストレベルと行カバレッジ 80% 以上を CI で検証する。公開先は未定。
