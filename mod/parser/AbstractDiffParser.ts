import { DiffResultBase } from "../type.ts"

export default abstract class AbstractDiffParser {
  abstract getDiff<O extends object, N extends object>(
    result: DiffResultBase<O, N>,
  ): string

  protected toJsonValue = (value: unknown): string | number | undefined => {
    if (typeof value === "string") return `"${value}"`
    if (typeof value === "number") return value

    return undefined
  }
}
