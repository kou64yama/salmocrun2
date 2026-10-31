# CI の設計

入力: [性能設計](../nfr-design/performance-design.md)、[保護設計](../nfr-design/security-design.md)、[論理構成](../nfr-design/logical-components.md)、[構成要素](../../../inception/domain-design/components.md)、[機能仕様](../functional-design/functional-spec.md)。

GitHub Actions で依存関係を再現可能にインストールし、整形・静的検査、型検査、単体・結合・ブラウザ検査、行カバレッジ 80% 以上、ビルドを実行する。必要なコマンドとブラウザの前提は実装時に固定する。失敗時はマージ前に修正する。公開はこの CI 設計では行わず、公開先と方法の決定を待つ。
