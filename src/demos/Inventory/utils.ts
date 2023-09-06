export type Item = {
  name: string
  count: number
}

export const items: Item[] = [
  { name: "apple", count: 55 },
  { name: "durian", count: 3 },
  { name: "flint", count: 108 },
  { name: "diamond", count: 1 },
  { name: "bokoblin horn", count: 27 },
  { name: "keese wing", count: 18 },
]

export type Props = {
  items: Item[]
  addEventHandler: any
  isCurrent: boolean
}

export function sortFunction(by: keyof Item) {
  return (a: Item, b: Item) => (a[by] === b[by] ? 0 : a[by] < b[by] ? -1 : 1)
}

export function addItemToInventory(
  inventory: Item[],
  name?: string,
  numberOf = "1"
) {
  if (!name) return inventory
  const count = Number.parseInt(numberOf)

  const existingItem = inventory.find((i) => i.name === name)
  if (existingItem) {
    return inventory.map((item) =>
      item === existingItem ? { ...item, count: item.count + count } : item
    )
  } else {
    return [...inventory, { name, count }]
  }
}
