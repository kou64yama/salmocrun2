# 操作上のルール

入力: [機能仕様](functional-spec.md)、[要件](../../../inception/requirements-analysis/requirements.md)。

```yaml
rules:
  - id: BR1.1
    statement: 画像選択と読み取りの状態を管理する
    category: policy
    applies_to: 読み取り操作
    trigger: 画像選択と認識完了
    logic: 新しい画像なら古い結果を破棄し、現在の選択の結果だけを表示する
    violation_behaviour: 古い完了を無視する
    source: FR1, FR2, FR3, FR4, FR5, FR10, NFR3
  - id: BR1.2
    statement: 利用可能な共有またはコピーを提供する
    category: policy
    applies_to: 共有操作
    trigger: 共有またはコピーの要求
    logic: 画像とコードの共有が可能なら共有し、不可ならコピーを提供する
    violation_behaviour: 失敗を通知し再試行可能にする
    source: FR6, FR7
  - id: BR1.3
    statement: 対象環境で導入可能な画面を提供する
    category: policy
    applies_to: アプリの起動と操作
    trigger: インストールまたは利用
    logic: 日本語の画面を表示し、キーボードと読み上げに対応する
    violation_behaviour: 利用不能な状態を通知する
    source: FR8, FR9, NFR1, NFR2, NFR4, NFR5
```
