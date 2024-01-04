import { DiffKey, ExistedDiffResult } from "../type.ts"
import AbstractDiffParser from "./AbstractDiffParser.ts"

export default class KeyParser extends AbstractDiffParser {
  constructor(private indent: string) {
    super()
  }

  public getDiff<O extends object, N extends object>(
    result: ExistedDiffResult<O, N>,
  ) {
    let text = ""
    text += `${this.indent}{\n`
    result.keys.forEach((key) => {
      text += this.parseDetail(key)
    })
    text += `${this.indent}},\n`

    return text
  }

  private parseDetail<O extends object, N extends object>(
    key: DiffKey<O, N>,
  ): string {
    const keyName = String(key.name)
    const oldValue = this.toJsonValue(key.old)
    const newValue = this.toJsonValue(key.new)

    if (key.type === "added") {
      return `+ ${this.indent}${keyName}: ${newValue},\n`
    }
    if (key.type === "removed") {
      return `- ${this.indent}${keyName}: ${oldValue},\n`
    }
    if (key.type === "unchanged") {
      return `  ${this.indent}${keyName}: ${oldValue},\n`
    }
    const removed = `- ${this.indent}${keyName}: ${oldValue},\n`
    const added = `+ ${this.indent}${keyName}: ${newValue},\n`

    return `${removed}${added}`
  }
}
