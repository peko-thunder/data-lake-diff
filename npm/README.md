# diff-unique-record

Make a difference between the old and new records.

However, deep objects are not supported.

## Installation

```bash
npm i diff-unique-record
```

## Examples

### diff()

Old and new data have common keys.

For example, date and name.

```typescript
import { diff } from 'diff-unique-record'

const oldDataList = [] // details below
const newDataList = [] // details below

const results = diff({
  old: oldDataList,
  new: newDataList,
  keys: ['date', 'name'],
})

console.log(results) // details below
```

#### oldDataList

```typescript
const oldDataList = [
  // object/key unchanged
  {
    date: "2023-12-01",
    name: "sales",
    value: 100,
  },
  // object/key updated
  {
    date: "2023-12-01",
    name: "rate",
    value: 20,
  },
  // object removed
  {
    date: "2023-12-02",
    name: "sales",
    value: 80,
  },
  // key removed/added
  {
    date: "2023-12-04",
    name: "sales",
    value: 90,
    oldtmp: "test",
  },
]
```

#### newDataList

```typescript
const newDataList = [
  // object/key unchanged
  {
    date: "2023-12-01",
    name: "sales",
    value: 100,
  },
  // object/key updated
  {
    date: "2023-12-01",
    name: "rate",
    value: 30,
  },
  // object added
  {
    date: "2023-12-03",
    name: "sales",
    value: 90,
  },
  // key removed/added
  {
    date: "2023-12-04",
    name: "sales",
    value: 70,
    newtmp: "test",
  },
]
```

#### results

Extract differences between old and new data.

```typescript
const results = [
  {
    type: "updated",
    old: { date: "2023-12-01", name: "rate", value: 20 },
    new: { date: "2023-12-01", name: "rate", value: 30 },
    keys: [
      {
        key: "date",
        type: "unchanged",
        old: "2023-12-01",
        new: "2023-12-01",
      },
      {
        key: "name",
        type: "unchanged",
        old: "rate",
        new: "rate"
        },
      {
        key: "value",
        type: "updated",
        old: 20,
        new: 30
      },
    ],
  },
  {
    type: "unchanged",
    old: { date: "2023-12-01", name: "sales", value: 100 },
    new: { date: "2023-12-01", name: "sales", value: 100 },
    keys: [
      {
        key: "date",
        type: "unchanged",
        old: "2023-12-01",
        new: "2023-12-01",
      },
      { 
        key: "name", 
        type: "unchanged",
        old: "sales", 
        new: "sales" 
      },
      { 
        key: "value", 
        type: "unchanged",
        old: 100,
        new: 100,
      },
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
        key: "date",
        type: "unchanged",
        old: "2023-12-04",
        new: "2023-12-04",
      },
      {
        key: "name",
        type: "unchanged",
        old: "sales",
        new: "sales"
      },
      {
        key: "value",
        type: "updated",
        old: 90,
        new: 70
      },
      {
        key: "oldtmp",
        type: "removed",
        old: "test",
        new: undefined
      },
      {
        key: "newtmp",
        type: "added",
        old: undefined,
        new: "test"
      },
    ],
  },
]
```

### generateDiffText()

Generate Diff results to text.

For example, when you want to show logging.

```typescript
import { generateDiffText } from 'diff-unique-record'

const results = [] // details above
const diffText = generateDiffText(results)

console.log(diffText) // details below
```

#### diffText

```bash
[
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
]
```
