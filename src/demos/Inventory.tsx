import { useEffect, useState } from "react"

type Item = {
  name: string
  type: "food" | "mineral" | "monster part"
  timesUsed: number
  count: number
}

export const items: Item[] = [
  { name: "apple", type: "food", timesUsed: 43, count: 55 },
  { name: "durian", type: "food", timesUsed: 27, count: 3 },
  { name: "flint", type: "mineral", timesUsed: 68, count: 108 },
  { name: "diamond", type: "mineral", timesUsed: 4, count: 1 },
  { name: "bokoblin horn", type: "monster part", timesUsed: 8, count: 27 },
  { name: "keese wing", type: "monster part", timesUsed: 34, count: 18 },
]

type Props = {
  items: Item[]
}

export const infiniteLoopInventoryCode = `export function FilteredItems({ items, filterBy }: Props) {
  const [filteredItems, setFilteredItems] = useState(items)

  if (filterBy) {
    setFilteredItems(items.filter((item) => item.type === filterBy))
  }

  return (
    <ul>
      {filteredItems.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  )
}`

export const sortedItemsCode = `export function SortedItems({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(items.toSorted(sortFunction(sortBy)))
  }

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("timesUsed")}>
        Sort by times used
      </button>
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

export function SortedItems({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
  }

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("timesUsed")}>
        Sort by times used
      </button>
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

function sortFunction(by: keyof Item) {
  return (a: Item, b: Item) => (a[by] === b[by] ? 0 : a[by] < b[by] ? -1 : 1)
}

export const slowInventoryCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
  }

  window.addEventListener("keydown", (event) => {
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key)
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  })

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("timesUsed")}>
        Sort by times used
      </button>
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

export function SlowInventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
  }

  window.addEventListener("keydown", (event) => {
    console.log("keydown handler called")
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key)
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  })

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("timesUsed")}>
        Sort by times used
      </button>
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

export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
  }

  // useEffect(() => {
  window.addEventListener("keydown", (event) => {
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key)
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  })
  // }, [sortedItems])

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("timesUsed")}>
        Sort by times used
      </button>
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
