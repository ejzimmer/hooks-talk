import { useState, useRef, useEffect } from "react"
import { Item, Props, sortFunction } from "./utils"

export function InventoryWithoutCleanup({
  items,
  isCurrent,
  addEventHandler,
  showCount,
}: Props & { showCount?: boolean }) {
  console.log("rendering component")
  const [sortedItems, setSortedItems] = useState(items)
  const numberOfKeydowns = useRef(0)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
  }

  useEffect(() => {
    console.log("running useEffect")
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return

      const indexToUpdate = Number.parseInt(event.key) - 1
      console.log("setting state")
      numberOfKeydowns.current++
      setSortedItems(
        sortedItems.map((item, index) =>
          index === indexToUpdate ? { ...item, count: --item.count } : item
        )
      )
    }

    if (isCurrent) {
      window.addEventListener("keydown", onKeyDown)
      addEventHandler(onKeyDown)
    }
  }, [sortedItems, isCurrent, addEventHandler])

  return (
    <>
      {showCount && (
        <div>
          OnKeydown called{" "}
          <span style={{ color: "var(--primary-colour)", fontSize: "1.5em" }}>
            {numberOfKeydowns.current}
          </span>{" "}
          times
        </div>
      )}
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

export function InventoryWithoutCleanupOrDependency({
  items,
  isCurrent,
  addEventHandler,
  showCount,
}: Props & { showCount?: boolean }) {
  const [sortedItems, setSortedItems] = useState(items)
  const numberOfKeydowns = useRef(0)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return

      const indexToUpdate = Number.parseInt(event.key) - 1
      numberOfKeydowns.current++
      setSortedItems(
        sortedItems.map((item, index) =>
          index === indexToUpdate ? { ...item, count: --item.count } : item
        )
      )
    }

    if (isCurrent) {
      window.addEventListener("keydown", onKeyDown)
      addEventHandler(onKeyDown)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent, addEventHandler])

  return (
    <>
      {showCount && (
        <div>
          OnKeydown called{" "}
          <span style={{ color: "var(--primary-colour)", fontSize: "1.5em" }}>
            {numberOfKeydowns.current}
          </span>{" "}
          times
        </div>
      )}
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
