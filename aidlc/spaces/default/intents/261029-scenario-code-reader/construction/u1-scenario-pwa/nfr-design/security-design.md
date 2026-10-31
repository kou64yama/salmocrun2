# データ保護の設計

入力: [性能要件](../nfr-requirements/performance-requirements.md)、[保護要件](../nfr-requirements/security-requirements.md)、[技術](../nfr-requirements/tech-stack-decisions.md)、[機能仕様](../functional-design/functional-spec.md)。

選択画像と候補は画面内の一時状態として保持し、履歴用の永続保存をしない。画像を別のものに替えると古い参照と結果を解放する。利用者の共有操作を除き画像・候補を外部に送信せず、同じ配布元から認識用資源だけを取得する。JPEG の読込可能性を検証し、失敗は通知する。共有は安全なコンテキストで明示的な操作により行う。

検証時はネットワーク記録で、画像選択・認識中の送信内容に画像や候補が含まれないことを確認し、共有操作を別に扱う。アプリを閉じた後、永続ストレージに画像や候補が履歴として残らないことを確認する。依存資源の取得先と配布設定は実装時に確認する。
