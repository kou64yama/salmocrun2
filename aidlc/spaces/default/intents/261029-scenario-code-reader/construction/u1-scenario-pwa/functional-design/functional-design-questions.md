# 機能設計の質問

## Q1. 対応画像形式

初回に受け付ける画像形式はどれにしますか？

A. JPEG と PNG
B. JPEG のみ
X. Other (please specify)

[Answer]: B. JPEG のみ

## Q2. 認識の再試行

準備データの取得や読み取りが失敗した場合、選択画像を保持し、同じ画像で再試行できるようにしますか？

A. はい、同じ画像で再試行できる
B. 別の画像を選び直す
X. Other (please specify)

[Answer]: A. はい、同じ画像で再試行できる

## Q3. 形式不一致の表示

読み取り結果の前後の空白や改行を取り除いた後、形式判定と表示・共有を行う案でよいですか？

A. はい、前後の空白・改行を取り除く
B. 加工せずに表示する
X. Other (please specify)

[Answer]: A. はい、前後の空白・改行を取り除く

## Consolidated Summary Confirmation

- 初回に受け付ける画像形式は JPEG のみ。
- 準備データの取得や読み取りが失敗した場合は、同じ画像で再試行できる。
- 読み取り結果の前後の空白・改行を取り除いてから形式判定、表示、共有を行う。

この内容で機能設計を作成してよいですか？

- Looks correct
- Request changes

[Answer]: Looks correct
