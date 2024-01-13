# diff-unique-record

データレイクなどの膨大なデータの管理業務を行っていると、調査などでデータの新旧差分を出したい時がある。
新旧のオブジェクト型の配列データを比較して、その差分をプログラムで確認するためのツールです。

階層の深いオブジェクトや配列には対応しておらず、単一階層のレコードを比較することを想定しています。

使い方はこちらの[ドキュメント](./npm/README.md)を参照ください。

## Deno環境テンプレート

以下を参照して作成

zenn

> https://zenn.dev/kawarimidoll/articles/b7d998328908aa

github

> https://github.com/kawarimidoll/deno-dev-template

## 環境構築

### Deno

Docker環境でDonoを使ってもVSCodeでリンターを動かすため、PCにもDenoのインストールが必要となる。個別にインストールすること。

有効化(Enable)する時はglobalではなくDenoを使うworkspaceのみにすること

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

公開バージョンを指定することができる

```bash
deno task build-npm ${version}
npm publish ./npm
```
