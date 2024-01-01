# data-lake-diff

データレイクなど膨大なデータの中から差分を求められることが多々ある。
これはオブジェクト型の配列データを新旧で比較して、その差分をプログラムで確認するためのツールです。

注意点として階層の深いオブジェクトや配列には現時点で対応していません。

## diffサンプル

実際に新旧のデータを投入して差分を抽出した結果です。

### 差分取得方法

新旧のデータで共通したユニークな`keys`を設定することで比較を行っています。サンプルでは`date`,`name`の組み合わせをユニークと定義しています。

```typescript
const result = diff({
  old: oldDataList,
  new: newDataList,
  keys: ["date", "name"],
})
```

### oldDataList

```javascript
const oldDataList = [
  // object/key unchanged
  {
    date: "2023-12-01",
    name: "sales",
    value: 100,
  },
  // object/key updated
  {
    date: "2023-12-01",
    name: "rate",
    value: 20,
  },
  // object removed
  {
    date: "2023-12-02",
    name: "sales",
    value: 80,
  },
  // key removed/added
  {
    date: "2023-12-04",
    name: "sales",
    value: 90,
    oldtmp: "test",
  },
]
```

### newDataList

```javascript
const newDataList = [
  // object/key unchanged
  {
    date: "2023-12-01",
    name: "sales",
    value: 100,
  },
  // object/key updated
  {
    date: "2023-12-01",
    name: "rate",
    value: 30,
  },
  // object added
  {
    date: "2023-12-03",
    name: "sales",
    value: 90,
  },
  // key removed/added
  {
    date: "2023-12-04",
    name: "sales",
    value: 70,
    newtmp: "test",
  },
]
```

### results

```javascript
const results = [
  {
    type: "updated",
    old: { date: "2023-12-01", name: "rate", value: 20 },
    new: { date: "2023-12-01", name: "rate", value: 30 },
    keys: [
      {
        key: "date",
        type: "unchanged",
        old: "2023-12-01",
        new: "2023-12-01",
      },
      { key: "name", type: "unchanged", old: "rate", new: "rate" },
      { key: "value", type: "updated", old: 20, new: 30 },
    ],
  },
  {
    type: "unchanged",
    old: { date: "2023-12-01", name: "sales", value: 100 },
    new: { date: "2023-12-01", name: "sales", value: 100 },
    keys: [
      {
        key: "date",
        type: "unchanged",
        old: "2023-12-01",
        new: "2023-12-01",
      },
      { key: "name", type: "unchanged", old: "sales", new: "sales" },
      { key: "value", type: "unchanged", old: 100, new: 100 },
    ],
  },
  {
    type: "removed",
    old: { date: "2023-12-02", name: "sales", value: 80 },
    new: undefined,
    keys: [],
  },
  {
    type: "added",
    old: undefined,
    new: { date: "2023-12-03", name: "sales", value: 90 },
    keys: [],
  },
  {
    type: "updated",
    old: { date: "2023-12-04", name: "sales", value: 90, oldtmp: "test" },
    new: { date: "2023-12-04", name: "sales", value: 70, newtmp: "test" },
    keys: [
      {
        key: "date",
        type: "unchanged",
        old: "2023-12-04",
        new: "2023-12-04",
      },
      { key: "name", type: "unchanged", old: "sales", new: "sales" },
      { key: "value", type: "updated", old: 90, new: 70 },
      { key: "oldtmp", type: "removed", old: "test", new: undefined },
      { key: "newtmp", type: "added", old: undefined, new: "test" },
    ],
  },
]
```

## Deno環境テンプレート

以下を参照して作成

zenn

> https://zenn.dev/kawarimidoll/articles/b7d998328908aa

github

> https://github.com/kawarimidoll/deno-dev-template

## 環境構築

### Deno

Docker環境でDonoを使ってもVSCodeでリンターを動かすため、PCにもDenoのインストールが必要となる。個別にインストールすること。

公式参照

> https://docs.deno.com/runtime/manual/getting_started/installation

### VSCode 拡張機能

これをインストールすること。PC にインストールしたDenoを参照して動作する。

> https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno

### hooks

`git commit`時のhookを設定

```bash
deno task setup-hooks
```

### commitlint

Deno環境のため、グローバル環境にインストールする。

```bash
npm install -g @commitlint/cli @commitlint/config-conventional
```

`git commit`時のコメントに対してリントを行う機能で以下のような制約を設定可能。

フォーマット: `<型>: #issue番号 <タイトル>`

例: `feat: #1 Fee Simulation`

<型>

- build: ビルドシステムまたは外部依存関係に影響する変更
- ci: CI 構成ファイルとスクリプトへの変更
- docs: ドキュメントのみの変更
- feat: 新機能
- fix: バグ修正
- perf: パフォーマンスの向上
- refactor: リファクタリング（バグ修正も機能追加も行わないコード変更）
- style: コードの意味に影響しない変更（空白、書式設定、セミコロンなど）
- test: 不足しているテストの追加または既存のテストの修正

## npmパッケージ化

以下を参照

> https://blog.cybozu.io/entry/2023/10/11/110000

```bash
deno task build-npm
```
