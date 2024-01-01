import { getIndex, getKeys } from "./util.ts"
import { DiffKey, DiffParam, DiffResult, DiffType } from "./type.ts"

/**
 * オブジェクト型配列を比較してデータの差分結果を返す
 * @param param
 * @returns
 */
export const diff = <O extends object, N extends object>(
  param: DiffParam<O, N>,
): DiffResult<O, N>[] => {
  const oldKeyMap = getKeyMap(param.old, param.keys)
  const newKeyMap = getKeyMap(param.new, param.keys)
  const keySet = mergeKeySet(oldKeyMap, newKeyMap)

  const results = Array.from(keySet).map((key) => {
    const oldData = oldKeyMap.get(key)
    const newData = newKeyMap.get(key)
    const diffKey = getDiffKey(oldData, newData)

    let diffType: DiffType = "unchanged"
    if (oldData === undefined && newData) diffType = "added"
    if (oldData && newData === undefined) diffType = "removed"
    if (diffKey.some((data) => data.type !== "unchanged")) diffType = "updated"

    return {
      type: diffType,
      old: oldData,
      new: newData,
      keys: diffKey,
    }
  })

  return results
}

/**
 * オブジェクト配列からユニークな組み合わせのkeyを組み合わせて、ユニークなMapを作成する
 * @param dataList
 * @param keys
 * @returns
 */
export const getKeyMap = <T extends object>(
  dataList: T[],
  keys: (keyof T)[],
): Map<string, T> => {
  const separator = "__"
  const keyMap = new Map<string, T>(dataList.map((data) => {
    const uniqueKey = keys.reduce((separateKey: string, key) => {
      // TODO: String()で変換できない場合の処理を追加する
      separateKey += `${String(data[key])}${separator}`

      return separateKey
    }, separator)

    return [uniqueKey, data]
  }))

  return keyMap
}

/**
 * 新旧のMapをマージして重複を除いたSetを返す
 * @param oldMap
 * @param newMap
 * @returns
 */
export const mergeKeySet = <O extends object, N extends object>(
  oldMap: Map<string, O>,
  newMap: Map<string, N>,
): Set<string> => {
  const oldKeys = Array.from(oldMap).map(([key]) => key)
  const newKeys = Array.from(newMap).map(([key]) => key)
  const allKeys = [...oldKeys, ...newKeys].sort((a, b) => a > b ? 1 : -1)
  const keySet = new Set(allKeys)

  return keySet
}

/**
 * 新旧のオブジェクトからkeyを比較して返す
 * @param oldData
 * @param newData
 * @returns
 */
export const getDiffKey = <O extends object, N extends object>(
  oldData?: O,
  newData?: N,
): DiffKey<O, N>[] => {
  if (oldData === undefined || newData === undefined) {
    return []
  }
  const mergedData = { ...oldData, ...newData }
  const keys = getKeys(mergedData)

  const results = keys.map((key) => {
    const oldIndex = getIndex(oldData, key)
    const newIndex = getIndex(newData, key)

    let diffType: DiffType = "updated"
    if (!oldIndex.hasKey && newIndex.hasKey) diffType = "added"
    if (oldIndex.hasKey && !newIndex.hasKey) diffType = "removed"
    if (oldIndex.value === newIndex.value) diffType = "unchanged"

    return {
      key,
      type: diffType,
      old: oldIndex.value,
      new: newIndex.value,
    }
  })

  return results
}
