/**
 * 型定義の都合上、型ガードを必要とする汎用関数を定義
 */

/**
 * Object.keys()のkeyをユニオン型で取得する
 * @param object
 * @returns
 */
export const getKeys = <O extends object>(
  object: O,
): (keyof O)[] => {
  return Object.keys(object) as (keyof O)[]
}

/**
 * Objectに対してIndexアクセスをした結果を返す
 * @param object
 * @param key
 * @returns
 */
export const getIndex = <O extends object>(
  object: O,
  key: string | number | symbol,
): IndexResult<O> => {
  const hasKey = hasOwnProperty(object, key)
  const value: O[keyof O] | undefined = hasKey ? object[key] : undefined

  return { object, key, value, hasKey }
}

/**
 * Objectに対してIndexアクセスした結果
 */
export interface IndexResult<O extends object> {
  object: O
  key: string | number | symbol
  value: O[keyof O] | undefined
  hasKey: boolean
}

/**
 * Objectが該当のkeyを所持しているか判定する
 * @param object
 * @param key
 * @returns
 */
export const hasOwnProperty = <T extends object>(
  object: T,
  key: unknown,
): key is keyof T => {
  return (key as string | number | symbol) in object
}
