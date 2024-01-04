import { assertEquals } from "std/testing/asserts.ts"
import { DiffResult } from "../mod/type.ts"
import { OldData } from "./data/old.ts"
import { NewData } from "./data/new.ts"
import { generateDiffText } from "../mod/index.ts"

const diffResults: DiffResult<OldData, NewData>[] = [
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
]

const diffText = `[
  {
    date: "2023-12-01",
    name: "rate",
-   value: 20,
+   value: 30,
  },
  {
    date: "2023-12-01",
    name: "sales",
    value: 100,
  },
- {
-   date: "2023-12-02",
-   name: "sales",
-   value: 80,
- },
+ {
+   date: "2023-12-03",
+   name: "sales",
+   value: 90,
+ },
  {
    date: "2023-12-04",
    name: "sales",
-   value: 90,
+   value: 70,
-   oldtmp: "test",
+   newtmp: "test",
  },
]`

Deno.test("generateDiffText", () => {
  assertEquals(
    generateDiffText(diffResults),
    diffText,
  )
})
