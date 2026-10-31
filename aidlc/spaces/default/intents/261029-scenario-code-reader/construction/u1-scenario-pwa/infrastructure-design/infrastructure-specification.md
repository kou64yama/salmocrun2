# 配布の設計

入力: [性能設計](../nfr-design/performance-design.md)、[保護設計](../nfr-design/security-design.md)、[論理構成](../nfr-design/logical-components.md)、[構成要素](../../../inception/domain-design/components.md)、[機能仕様](../functional-design/functional-spec.md)。

| 対象 | 方針 | 未確定事項 |
| --- | --- | --- |
| PWA 資源 | 静的資源として一体で配布、認識資源も同じ配布元 | 公開先と配備方法 |
| ブラウザ機能 | 共有・導入に安全なコンテキストを使用 | 公開先で HTTPS とパスの確認 |
| バックエンド | 使用しない | なし |

配布先を特定の事業者に固定せず、ベースパスを設定できるようにする。実際の公開設定は公開先決定後に検証する。
