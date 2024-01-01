/**
 * diff()実行パラメーター
 */
export interface DiffParam<O extends object, N extends object> {
  old: O[]
  new: N[]
  keys: (keyof O & keyof N)[]
}

/**
 * 新旧オブジェクトを比較した結果
 */
export interface DiffResult<O extends object, N extends object> {
  type: DiffType
  keys: DiffKey<O, N>[]
  // TODO: deep object やarrayの対応をするかどうか 一旦はシンプルな作りにする
  // test: O[keyof O] extends object ? DiffObject<O, N> : DiffKey<O, N>[]
  old?: O
  new?: N
}

/**
 * 比較タイプのユニオン型
 */
export type DiffType = "added" | "removed" | "updated" | "unchanged"

/**
 * 新旧オブジェクト内のkeyを比較した結果
 */
export interface DiffKey<O extends object, N extends object> {
  key: keyof O | keyof N
  type: DiffType
  old?: O[keyof O]
  new?: N[keyof N]
}
