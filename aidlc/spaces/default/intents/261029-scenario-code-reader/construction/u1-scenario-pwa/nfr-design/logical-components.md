# 品質設計の適用箇所

入力: [性能要件](../nfr-requirements/performance-requirements.md)、[保護要件](../nfr-requirements/security-requirements.md)、[技術](../nfr-requirements/tech-stack-decisions.md)、[機能仕様](../functional-design/functional-spec.md)。

| 対象 | 設計 |
| --- | --- |
| 画面 | 一時状態、状態通知、キーボード・読み上げ、古い結果の破棄 |
| 認識 | 同じ配布元の資源を使用し、失敗を通知して再試行可能にする |
| 共有 | 明示操作で画像と候補を共有、非対応時はコピーを提供 |
| PWA 資源 | インストールと起動を対象 Chrome で確認 |

WCAG 2.2 AA を目標に、適用基準ごとに確認方法、結果、証拠と未確認・対象外の理由を記録する。
