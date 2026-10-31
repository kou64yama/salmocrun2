# 外部依存

入力: [要件](../requirements-analysis/requirements.md)、[ストーリー](../user-stories/stories.md)、[画面案](../refined-mockups/mockups.md)、[構成](../domain-design/components.md)、[作業単位](../units-generation/unit-of-work.md)、[依存関係](../units-generation/unit-of-work-dependency.md)、[割り当て](../units-generation/unit-of-work-story-map.md)、[開発方針](../practices-discovery/team-practices.md)。

| 依存 | U1 への影響 | 対応 |
| --- | --- | --- |
| 提供画像 | 認識領域と正解の検証 | `tests/fixtures/SHQ4-PVS6-ALNL-VA6D.jpg` を使用 |
| Chrome、OS、共有先 | ファイル共有やインストールの可否が環境依存 | 対象環境で確認し、共有不可時はコピーを提供 |
| 認識の準備データ | 利用不能時は認識できない | 取得失敗を通知し、再試行を可能にする |

他に着手を待つ外部依存は把握していない。公開先と方法は後で決める。
