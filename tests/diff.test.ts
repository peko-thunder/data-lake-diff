import { assertEquals } from "std/testing/asserts.ts"
import { oldDataList } from "./data/old.ts"
import { newDataList } from "./data/new.ts"
import { diff, getKeyMap, mergeKeySet } from "../mod/diff.ts"

Deno.test("diff", () => {
  const result = diff({
    old: oldDataList,
    new: newDataList,
    keys: ["date", "name"],
  })
  assertEquals(result, [
    {
      type: "updated",
      old: { date: "2023-12-01", name: "rate", value: 20 },
      new: { date: "2023-12-01", name: "rate", value: 30 },
      keys: [
        {
          name: "date",
          type: "unchanged",
          old: "2023-12-01",
          new: "2023-12-01",
        },
        { name: "name", type: "unchanged", old: "rate", new: "rate" },
        { name: "value", type: "updated", old: 20, new: 30 },
      ],
    },
    {
      type: "unchanged",
      old: { date: "2023-12-01", name: "sales", value: 100 },
      new: { date: "2023-12-01", name: "sales", value: 100 },
      keys: [
        {
          name: "date",
          type: "unchanged",
          old: "2023-12-01",
          new: "2023-12-01",
        },
        { name: "name", type: "unchanged", old: "sales", new: "sales" },
        { name: "value", type: "unchanged", old: 100, new: 100 },
      ],
    },
    {
      type: "removed",
      old: { date: "2023-12-02", name: "sales", value: 80 },
      new: undefined,
      keys: [],
    },
    {
      type: "added",
      old: undefined,
      new: { date: "2023-12-03", name: "sales", value: 90 },
      keys: [],
    },
    {
      type: "updated",
      old: { date: "2023-12-04", name: "sales", value: 90, oldtmp: "test" },
      new: { date: "2023-12-04", name: "sales", value: 70, newtmp: "test" },
      keys: [
        {
          name: "date",
          type: "unchanged",
          old: "2023-12-04",
          new: "2023-12-04",
        },
        { name: "name", type: "unchanged", old: "sales", new: "sales" },
        { name: "value", type: "updated", old: 90, new: 70 },
        { name: "oldtmp", type: "removed", old: "test", new: undefined },
        { name: "newtmp", type: "added", old: undefined, new: "test" },
      ],
    },
  ])
})

Deno.test("getKeyMap: old", () => {
  const oldkeyMap = getKeyMap(oldDataList, ["date", "name"])
  assertEquals(
    oldkeyMap,
    new Map([
      ["__2023-12-01__sales__", {
        date: "2023-12-01",
        name: "sales",
        value: 100,
      }],
      ["__2023-12-01__rate__", {
        date: "2023-12-01",
        name: "rate",
        value: 20,
      }],
      ["__2023-12-02__sales__", {
        date: "2023-12-02",
        name: "sales",
        value: 80,
      }],
      ["__2023-12-04__sales__", {
        date: "2023-12-04",
        name: "sales",
        value: 90,
        oldtmp: "test",
      }],
    ]),
  )
})

Deno.test("getKeyMap: new", () => {
  const newKeyMap = getKeyMap(newDataList, ["date", "name"])
  assertEquals(
    newKeyMap,
    new Map([
      ["__2023-12-01__sales__", {
        date: "2023-12-01",
        name: "sales",
        value: 100,
      }],
      ["__2023-12-01__rate__", {
        date: "2023-12-01",
        name: "rate",
        value: 30,
      }],
      ["__2023-12-03__sales__", {
        date: "2023-12-03",
        name: "sales",
        value: 90,
      }],
      ["__2023-12-04__sales__", {
        date: "2023-12-04",
        name: "sales",
        value: 70,
        newtmp: "test",
      }],
    ]),
  )
})

Deno.test("mergeKeySet", () => {
  const oldKeyMap = new Map([
    ["__2023-12-01__sales__", {}],
    ["__2023-12-01__rate__", {}],
    ["__2023-12-02__sales__", {}],
    ["__2023-12-04__sales__", {}],
  ])
  const newKeyMap = new Map([
    ["__2023-12-01__sales__", {}],
    ["__2023-12-01__rate__", {}],
    ["__2023-12-03__sales__", {}],
    ["__2023-12-04__sales__", {}],
  ])
  const keySet = mergeKeySet(oldKeyMap, newKeyMap)
  assertEquals(
    keySet,
    new Set([
      "__2023-12-01__sales__",
      "__2023-12-01__rate__",
      "__2023-12-02__sales__",
      "__2023-12-03__sales__",
      "__2023-12-04__sales__",
    ]),
  )
})
