export interface NewData {
  date: string
  name: string
  value: number
  newtmp?: string
}

export const newDataList: NewData[] = [
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
