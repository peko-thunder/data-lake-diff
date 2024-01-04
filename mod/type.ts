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
export type DiffResult<O extends object, N extends object> =
  | AddedDiffResult<O, N>
  | RemovedDiffResult<O, N>
  | ExistedDiffResult<O, N>

/**
 * 比較結果のベースインターフェース
 */
export interface DiffResultBase<O extends object, N extends object> {
  type: DiffType
  keys: DiffKey<O, N>[]
}

/**
 * 追加判定の比較結果
 */
export interface AddedDiffResult<O extends object, N extends object>
  extends DiffResultBase<O, N> {
  type: "added"
  old: undefined
  new: N
}

/**
 * 削除判定の比較結果
 */
export interface RemovedDiffResult<O extends object, N extends object>
  extends DiffResultBase<O, N> {
  type: "removed"
  old: O
  new: undefined
}

/**
 * 既存判定の比較結果
 */
export interface ExistedDiffResult<O extends object, N extends object>
  extends DiffResultBase<O, N> {
  type: "updated" | "unchanged"
  old: O
  new: N
}

/**
 * 比較タイプのユニオン型
 */
export type DiffType = "added" | "removed" | "updated" | "unchanged"

/**
 * 新旧オブジェクト内のkeyを比較した結果
 */
export interface DiffKey<O extends object, N extends object> {
  name: keyof O | keyof N
  type: DiffType
  old?: O[keyof O]
  new?: N[keyof N]
}
