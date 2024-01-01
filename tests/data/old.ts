export interface OldData {
  date: string
  name: string
  value: number
  oldtmp?: string
}

export const oldDataList: OldData[] = [
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
