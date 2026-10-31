# 実装計画

## 修正計画

- [x] R-01: 認識処理をカバレッジ対象に含め、全対象の行カバレッジ 80% 以上を実際に検証する。
- [ ] R-02: 整形と静的検査を設定し、GitHub Actions で実行する。
- [x] R-03: 実画像の正解コードと認識候補を比較し、精度の数値目標を設けず結果を記録する。
- [x] R-04: Playwright ブラウザの準備と実行手順を文書化し、再確認する。

- [ ] プロジェクト設定とテスト環境を準備する。
- [ ] 認識と形式判定の失敗テストを書き、実装して整える（US1.1）。
- [ ] 共有とコピーの失敗テストを書き、実装して整える（US1.2）。
- [ ] 画面と状態遷移の失敗テストを書き、実装して整える（US1.1、US1.2、US1.3）。
- [ ] PWA の資源、同一配布元の認識データ、ビルドと CI を設定する（US1.3）。
- [ ] 実画像を含む結合・ブラウザ検証、80% 行カバレッジ、型検査とビルドを実行し、結果を記録する。
- [ ] 成果と追跡、変更ファイルを記録する。

データベース、リポジトリ層、公開 API は対象外。JPEG と状態管理を各対象層の Red / Green / Refactor で検証する。

## Testing Contract

```json
{
  "version": 1,
  "methodology": "tdd",
  "source": "team",
  "ordering": "テストを先に書き、それを満たす実装を行う。",
  "scope": "mvp",
  "test_strategy": "standard",
  "project_type": "greenfield",
  "applicable_notes": [
    {
      "layer": "org",
      "text": "We treat tests as a first-class deliverable in every Bolt. The specific\nmethodology (TDD, BDD, ATDD, or classic test-after) is affirmed at\npractices-discovery and recorded in `team.md` under this heading with explicit\n`Methodology` and `Ordering` fields; Code Generation resolves those fields\nindependently from coverage, tooling, and scope notes.\n\nWhen no posture has been affirmed, our default per scope is:\n- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run\n  that layer's tests.\n- `mvp`, `enterprise`, `feature`, `infra`, `classic` add an 80% line-coverage\n  floor and CI execution before merge.\n- `bugfix`, `security-patch` add a targeted regression for the specific\n  bug/vulnerability and require the existing suite to remain green.\n- `express` uses the Minimal strategy: requirement-driven unit tests (one per\n  requirement, with a happy-path floor per component); existing tests remain\n  green.\n- `poc`, `refactor`, `workshop` add no extra new-test floor and require the\n  existing suite to remain green.\n\nThe active `Test Strategy` still applies in every scope and determines test\nvolume/types. Scope floors are additive; they never reduce or replace the\nselected strategy.\n\nBuild and Test verifies defined coverage floors and affirmed quality targets;\nthey may not be weakened to make a step pass.\n\nAffirm a stricter posture in `team.md` if the team commits to one."
    },
    {
      "layer": "team",
      "text": "- **Methodology**: tdd\n- **Methodology evidence**: テストを先に書いてから実装する方法が選ばれた。\n- **Ordering**: テストを先に書き、それを満たす実装を行う。\n- MVP の条件として行カバレッジ 80% 以上とマージ前の CI 実行を維持する。\n- 指定された Vitest、testing-library、Playwright を使用する。"
    }
  ],
  "obligations": {
    "strategy": "standard",
    "strategy_volume": [
      "Five to eight tests per component.",
      "Unit tests plus integration tests for key boundaries.",
      "Add E2E, performance, or security tests when requirements demand them."
    ],
    "scope_floor": [
      "Meet an 80% line-coverage floor.",
      "Run the selected tests in CI before merge."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "tdd",
    "runner_step": "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
    "runner_ready_before_first_test": true,
    "testable_layers": [
      "Data model / database behavior",
      "Repository / data access",
      "Business logic",
      "API / endpoint",
      "Frontend behavior"
    ],
    "steps": [
      "Project structure and production configuration skeleton.",
      "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
      "Data model / database behavior - Red: write the failing tests and record the failing command output.",
      "Data model / database behavior - Green: implement only enough behavior to pass.",
      "Data model / database behavior - Refactor: improve the implementation while tests stay green.",
      "Repository / data access - Red: write the failing tests and record the failing command output.",
      "Repository / data access - Green: implement only enough behavior to pass.",
      "Repository / data access - Refactor: improve the implementation while tests stay green.",
      "Business logic - Red: write the failing tests and record the failing command output.",
      "Business logic - Green: implement only enough behavior to pass.",
      "Business logic - Refactor: improve the implementation while tests stay green.",
      "API / endpoint - Red: write the failing tests and record the failing command output.",
      "API / endpoint - Green: implement only enough behavior to pass.",
      "API / endpoint - Refactor: improve the implementation while tests stay green.",
      "Frontend behavior - Red: write the failing tests and record the failing command output.",
      "Frontend behavior - Green: implement only enough behavior to pass.",
      "Frontend behavior - Refactor: improve the implementation while tests stay green.",
      "Environment/build configuration.",
      "Documentation and traceability."
    ]
  },
  "input_sha256": "sha256:05853999951b78176c329eb109ad4e459306ebd7b1037c6ed1dd10364d76e04e",
  "contract_sha256": "sha256:811bac8da207f318d0b28ddf38d18803db086c332d4374aee899dd3b8858b747"
}
```

