# 監視と検証

入力: [性能設計](../nfr-design/performance-design.md)、[保護設計](../nfr-design/security-design.md)、[論理構成](../nfr-design/logical-components.md)、[構成要素](../../../inception/domain-design/components.md)、[機能仕様](../functional-design/functional-spec.md)。

| 対象 | 方法 |
| --- | --- |
| 読み取りと共有の失敗 | 画面に状態を示し再試行できる。画像やコードを外部監視へ送らない。 |
| PWA 導入 | 優先対象 Chrome でインストールと起動を確認し環境を記録する。 |
| データ保護 | 認識時のネットワークと永続ストレージを検証する。 |

サーバー監視は初回に設けない。公開先の稼働監視は公開先決定後に扱う。
