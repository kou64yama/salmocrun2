# 制約一覧

入力: [プロダクトの目的](../intent-capture/intent-statement.md)、[回答](feasibility-questions.md)。

| 項目 | 制約・決定 |
| --- | --- |
| 実行 | ブラウザ内で動作し、バックエンドを使わない。 |
| 優先環境 | スマートフォンとデスクトップの Chrome。 |
| 共有 | Web Share API を使い、画像とコードを同時に共有できない場合はコードのコピーなどの代替手段を用意する。 |
| 技術指定 | Vite、React、React Router、Mantine UI、Tesseract.js、Vitest、testing-library、Playwright。 |
| 予算・期限 | 特に定めていない。 |
| その他 | 追加の外部連携、規制・法令上の要件、組織上の制約は特に把握していない。AWS 利用予定はない。 |

Web Share API には安全なコンテキストなどの利用条件がある。[MDN: Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
