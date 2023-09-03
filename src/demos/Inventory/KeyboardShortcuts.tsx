import { useEffect, useState } from "react"
import { Item, Props, sortFunction } from "./utils"

export function InventoryWithKeyboardShortcuts({
  items,
  isCurrent,
}: Omit<Props, "addEventHandler">) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...sortedItems].sort(sortFunction(sortBy)))
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return
      const indexToUpdate = Number.parseInt(event.key) - 1
      setSortedItems(
        sortedItems.map((item, index) =>
          index === indexToUpdate ? { ...item, count: --item.count } : item
        )
      )
    }

    isCurrent && window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [sortedItems, isCurrent])

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
export const inventoryWithKeyboardShortcutsCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(sortedItems.toSorted(sortFunction(sortBy)))
  }

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (!event.key.match(/^[0-9]$/)) return

      const indexToUpdate = Number.parseInt(event.key)
      setSortedItems(
        sortedItems.map((item, index) =>
          index === indexToUpdate ? { ...item, count: --item.count } : item
        )
      )
    })
  }, [sortedItems])

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

export function WithoutUseEffect({ items, addEventHandler, isCurrent }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...sortedItems].sort(sortFunction(sortBy)))
  }

  const onKeyDown = (event: KeyboardEvent) => {
    console.log("keydown handler called")
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key) - 1
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  }

  if (isCurrent) {
    addEventHandler && addEventHandler(onKeyDown)
    window.addEventListener("keydown", onKeyDown)
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

export const withoutUseEffectCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(sortedItems.toSorted(sortFunction(sortBy)))
  }

  window.addEventListener("keydown", (event) => {
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key) - 1
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? 
          { ...item, count: --item.count } : 
          item
      )
    )
  })

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

export const abridgedWithoutUseEffectCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)
  ... 

  window.addEventListener("keydown", (event) => {
    ...
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? 
          { ...item, count: --item.count } : 
          item
      )
    )
  })

  return (...)
}
`
