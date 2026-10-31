# 優先する機能

入力: [目的](../intent-capture/intent-statement.md)、[実現可能性](../feasibility/feasibility-assessment.md)、[制約](../feasibility/constraint-register.md)、[範囲](scope-document.md)。

| ID | 機能 | 優先度 | 依存 |
| --- | --- | --- | --- |
| IB1 | 保存済み画像の選択と対応画像の取り扱い | Must | なし |
| IB2 | ブラウザ内でのシナリオコード読み取りと結果表示 | Must | IB1 |
| IB3 | コードと画像の共有 | Must | IB1、IB2 |
| IB4 | 共有できない場合のコードのコピーなどの代替手段 | Must | IB2 |
| IB5 | PWA と優先環境での利用 | Must | IB1–IB4 と統合 |

最初に、画像選択から読み取りと共有まで一通り動く最小の流れを優先する。認識の精度目標は初回に設定しない。

## 価値の流れ

保存画像を選択 → 読み取ったコードを確認 → 画像とコードを共有、または代替手段を使用。
