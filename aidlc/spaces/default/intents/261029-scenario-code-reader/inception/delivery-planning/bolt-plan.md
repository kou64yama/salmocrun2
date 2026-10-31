# 実装計画

入力: [要件](../requirements-analysis/requirements.md)、[ストーリー](../user-stories/stories.md)、[画面案](../refined-mockups/mockups.md)、[構成](../domain-design/components.md)、[作業単位](../units-generation/unit-of-work.md)、[依存関係](../units-generation/unit-of-work-dependency.md)、[割り当て](../units-generation/unit-of-work-story-map.md)、[開発方針](../practices-discovery/team-practices.md)。

## Bolt 1 — シナリオ読み取り PWA

Bolt は一つの作業を実装し、動作する成果を得る単位。対象は U1 `u1-scenario-pwa`。最初に一連の流れを通す最小版を作る。

- 完了条件: 承認済みの U1 要件と受け入れ条件を満たし、テスト先行、行カバレッジ 80% 以上と CI の条件を満たす。
- 検証したい仮説: 提供画像のコード領域をブラウザ内で認識し、その結果と画像を共有する流れがつながる。
- デモ: `tests/fixtures/SHQ4-PVS6-ALNL-VA6D.jpg` を選び、認識結果を表示し共有操作を行う。利用不可の場合はコードコピーを示す。
- 実際の一連の検証コマンドはプロジェクトに実行可能な検査ができた時点で選択する。認識精度の数値目標は設けない。
