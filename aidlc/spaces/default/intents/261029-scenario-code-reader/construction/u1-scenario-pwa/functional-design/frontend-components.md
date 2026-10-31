# 画面部品

入力: [作業単位](../../../inception/units-generation/unit-of-work.md)、[割り当て](../../../inception/units-generation/unit-of-work-story-map.md)、[ストーリー](../../../inception/user-stories/stories.md)、[要件](../../../inception/requirements-analysis/requirements.md)、[構成](../../../inception/domain-design/components.md)、[機能仕様](functional-spec.md)。

- 画面: 一時状態を所有し、選択識別子により古い完了を破棄する。
- 画像選択: JPEG を受け付け、プレビューと選び直しを提供する。
- 結果領域: 読み取り中、結果、警告、失敗を表示し、状態変化を読み上げ可能にする。
- 操作領域: 共有可能性に応じて共有またはコピーを提示し、失敗時に再試行する。
- アプリ起動: 導入資源と画面を接続する。

キーボードで各操作に到達・実行でき、フォーカスを表示する。画面は日本語で、狭い画面では縦に並ぶ。WCAG 2.2 AA を目標に検証する。
