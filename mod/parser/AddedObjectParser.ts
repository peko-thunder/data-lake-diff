import { AddedDiffResult } from "../type.ts"
import AbstractDiffParser from "./AbstractDiffParser.ts"

export default class AddedObjectParser extends AbstractDiffParser {
  constructor(private indent: string) {
    super()
  }

  public getDiff<O extends object, N extends object>(
    result: AddedDiffResult<O, N>,
  ): string {
    let text = ""
    text += `+ {\n`
    Object.entries(result.new).forEach(([key, value]) => {
      text += `+ ${this.indent}${key}: ${this.toJsonValue(value)},\n`
    })
    text += `+ },\n`

    return text
  }
}
