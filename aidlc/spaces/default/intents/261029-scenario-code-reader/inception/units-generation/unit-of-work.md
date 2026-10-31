# 作業単位

入力: [構成要素](../domain-design/components.md)、[設計判断](../domain-design/decisions.md)、[要件](../requirements-analysis/requirements.md)、[ストーリー](../user-stories/stories.md)。

| Unit ID | Directory | Kind | 配布 | 規模 |
| --- | --- | --- | --- | --- |
| U1 | u1-scenario-pwa | ui | 一体でビルド・配布 | M |

## U1: シナリオ読み取り PWA

画像選択、ブラウザ内認識、候補表示、共有とコピー、PWA の導入を所有する。ScenarioScreen、CodeRecognition、ShareAdapter、PwaShell を内包する。対象画像、優先ブラウザ、認識精度の目標なし、履歴非保存、指定技術とテスト方針は上記入力に従う。コード領域はサンプルで検証し、OCR の結果は形式不一致でも警告付きで共有可能とする。

最初に画像選択から実際の認識と共有までを通す最小版を含む。実際の一連の流れを示す検証方法は後続で合意する。
