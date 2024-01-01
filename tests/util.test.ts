import { assertEquals } from "std/testing/asserts.ts"
import { getIndex, getKeys, hasOwnProperty } from "../src/util.ts"

const object = {
  date: new Date("2023-12-01"),
  value: 100,
}

Deno.test("getKeys", () => {
  const keys = getKeys(object)
  assertEquals(keys, ["date", "value"])
})

Deno.test("getIndex: true", () => {
  const indexValue = getIndex(object, "value")
  assertEquals(indexValue, {
    object,
    key: "value",
    value: 100,
    hasKey: true,
  })
})

Deno.test("getIndex: false", () => {
  const indexValue = getIndex(object, "type")
  assertEquals(indexValue, {
    object,
    key: "type",
    value: undefined,
    hasKey: false,
  })
})

Deno.test("hasOwnProperty: true", () => {
  const has = hasOwnProperty(object, "date")
  assertEquals(has, true)
})

Deno.test("hasOwnProperty: false", () => {
  const has = hasOwnProperty(object, "type")
  assertEquals(has, false)
})
