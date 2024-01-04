import { DiffResult } from "../type.ts"
import AddedObjectParser from "./AddedObjectParser.ts"
import KeyParser from "./KeyParser.ts"
import RemovedObjectParser from "./RemovedObjectParser.ts"

export const generateDiffText = <O extends object, N extends object>(
  results: DiffResult<O, N>[],
): string => {
  const INDENT = "  "
  const parser = {
    added: new AddedObjectParser(INDENT),
    removed: new RemovedObjectParser(INDENT),
    key: new KeyParser(INDENT),
  }

  let text = "[\n"
  results.forEach((result) => {
    if (result.type === "added") text += parser.added.getDiff(result)
    if (result.type === "removed") text += parser.removed.getDiff(result)
    if (result.type === "unchanged") text += parser.key.getDiff(result)
    if (result.type === "updated") text += parser.key.getDiff(result)
  })
  text += "]"

  return text
}
