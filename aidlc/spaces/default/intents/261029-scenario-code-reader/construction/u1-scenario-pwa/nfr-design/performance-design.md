# 性能と対応環境の設計

入力: [性能要件](../nfr-requirements/performance-requirements.md)、[保護要件](../nfr-requirements/security-requirements.md)、[技術](../nfr-requirements/tech-stack-decisions.md)、[機能仕様](../functional-design/functional-spec.md)。

読み取りは非同期に実行し、進行状態を表示する。認識用プログラムとデータは同じ配布元から取得し、取得失敗を通知して再試行する。読み取り時間の数値目標は初回にはない。対象は検証時点のスマートフォンとデスクトップの安定版 Chrome とし、使用環境を記録する。
