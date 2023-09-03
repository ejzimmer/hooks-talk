export type Item = {
  name: string
  type: "food" | "mineral" | "monster part" | "custom"
  count: number
}

export const items: Item[] = [
  { name: "apple", type: "food", count: 55 },
  { name: "durian", type: "food", count: 3 },
  { name: "flint", type: "mineral", count: 108 },
  { name: "diamond", type: "mineral", count: 1 },
  { name: "bokoblin horn", type: "monster part", count: 27 },
  { name: "keese wing", type: "monster part", count: 18 },
]

export type Props = {
  items: Item[]
  addEventHandler: any
  isCurrent: boolean
}

export function sortFunction(by: keyof Item) {
  return (a: Item, b: Item) => (a[by] === b[by] ? 0 : a[by] < b[by] ? -1 : 1)
}
