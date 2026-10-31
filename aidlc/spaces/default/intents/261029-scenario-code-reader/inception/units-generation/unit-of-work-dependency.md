# 作業単位の依存関係

入力: [構成要素](../domain-design/components.md)、[設計判断](../domain-design/decisions.md)、[要件](../requirements-analysis/requirements.md)、[ストーリー](../user-stories/stories.md)。

```yaml
units:
  - name: u1-scenario-pwa
    kind: ui
    depends_on: []
```

U1 のみであり、作業単位間の依存や並行開発の組み合わせはない。画面、認識、共有の接続は U1 内の境界として扱う。U1 は画像選択から実際の認識と共有までの一連の最小版を含み、他の作業単位を必要としない。
