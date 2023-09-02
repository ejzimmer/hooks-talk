import { useState } from "react"
import { sortFunction } from "."
import { Item } from "./utils"

type Props = {
  items: Item[]
}

export function InventoryWithBrokenSort({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(items.sort(sortFunction(sortBy)))
  }

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("count")}>Sort by count</button>
      <ol>
        {sortedItems.map((item) => (
          <li key={item.name}>
            {item.name} {item.count}
          </li>
        ))}
      </ol>
    </>
  )
}

export const brokenSortedItemsCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(items.sort(sortFunction(sortBy)))
  }

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("count")}>Sort by count</button>
      <ol>
        {sortedItems.map((item) => (
          <li key={item.name}>
            {item.name} {item.count}
          </li>
        ))}
      </ol>
    </>
  )
}
`
