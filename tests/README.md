# 検証手順

Node.js 22 で `npm ci` を実行し、`npx playwright install --with-deps chromium` でブラウザを準備する。macOS では `npx playwright install chromium` でよい。

- 単体・結合テストとカバレッジ: `npm run coverage`
- 整形確認: `npm run format:check`
- 静的検査: `npm run lint`
- 型検査とビルド: `npm run build`
- ブラウザ検証: `npm run e2e`

ブラウザのインストール先を指定した場合は、インストールと実行の両方で同じ `PLAYWRIGHT_BROWSERS_PATH` を指定する。ブラウザ起動を制限する環境では、起動できる環境で実行する。

2026-10-31 の Chromium 実画像検証では、正解 `SHQ4-PVS6-ALNL-VA6D` に対し認識候補は `SHQY-PVS6-ALNL-VAGD` だった。候補は正解と一致しない。テストは画像選択・候補表示・共有を確認し、精度の閾値は設けていない。同日、Chrome で `127.0.0.1:4173` の PWA をインストールし、専用ウィンドウに画像選択画面が表示されることを確認した。スマートフォンでのインストールは未確認。
# データ保護の検証

2026-10-31 に Chromium の Playwright テスト `e2e/scenario.spec.ts` で実画像を認識し、認識中に外部 HTTP(S) リクエストや GET/HEAD 以外のリクエストがないこと、候補がリクエスト URL・本文に含まれないことを確認した。再読み込み後に候補が画面へ復元されず、localStorage、sessionStorage、Cookie に候補とファイル名がなく、IndexedDB がないことを確認した。3 件成功。共有操作やブラウザの HTTP キャッシュ内の内容はこの検査の対象外。
