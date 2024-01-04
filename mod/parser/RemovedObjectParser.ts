import { RemovedDiffResult } from "../type.ts"
import AbstractDiffParser from "./AbstractDiffParser.ts"

export default class RemovedObjectParser extends AbstractDiffParser {
  constructor(private indent: string) {
    super()
  }

  public getDiff<O extends object, N extends object>(
    result: RemovedDiffResult<O, N>,
  ): string {
    let text = ""
    text += `- {\n`
    Object.entries(result.old).forEach(([key, value]) => {
      text += `- ${this.indent}${key}: ${this.toJsonValue(value)},\n`
    })
    text += `- },\n`

    return text
  }
}
