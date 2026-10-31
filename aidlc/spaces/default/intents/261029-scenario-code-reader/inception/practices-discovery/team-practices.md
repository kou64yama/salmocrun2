# 開発の進め方

## Way of Working

変更はブランチを使ってまとめる。ブランチ名や統合方法の詳細は未定。

## Walking Skeleton

最初に、画像選択から認識結果と共有までを通す最小版を作り、各部分がつながることを確かめる。

## Testing Posture

- **Methodology**: tdd
- **Methodology evidence**: テストを先に書いてから実装する方法が選ばれた。
- **Ordering**: テストを先に書き、それを満たす実装を行う。
- MVP の条件として行カバレッジ 80% 以上とマージ前の CI 実行を維持する。
- 指定された Vitest、testing-library、Playwright を使用する。

## Deployment

公開先と公開方法は後で決める。ステージング環境を使う場合はマージ時に配備し、本番配備は別途人の承認を経る。

## Code Style

プロジェクトに設定した整形・検査ツールに従い、言語の命名規約を用いる。リンターはマージ前に CI で実行する。
