import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  FormEvent,
  useRef,
} from "react"
import { Props as BaseProps, Item, items, sortFunction } from "./utils"

type Props = Omit<BaseProps, "addEventHandler"> & {
  setItems: (items: Item[]) => void
}

export function UpdateableInventory({ items, setItems, isCurrent }: Props) {
  const [sortBy, setSortBy] = useState<keyof Item>("name")

  const sortedItems = useMemo(
    () => [...items].sort(sortFunction(sortBy)),
    [items, sortBy]
  )

  const handleClick = (sortBy: keyof Item) => {
    setSortBy(sortBy)
  }

  const consumeItem = useCallback(
    (item: Item) => {
      setItems &&
        setItems(
          items.map((i) => (i === item ? { ...i, count: --i.count } : i))
        )
    },
    [items, setItems]
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return
      const indexToUpdate = Number.parseInt(event.key) - 1
      const itemToUpdate = sortedItems[indexToUpdate]
      consumeItem(itemToUpdate)
    }

    isCurrent && window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [items, setItems, sortedItems, consumeItem, isCurrent])

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("count")}>Sort by count</button>
      <ol>
        {sortedItems.map((item) => (
          <li key={item.name}>
            <button onClick={() => consumeItem(item)}>
              {item.name} {item.count}
            </button>
          </li>
        ))}
      </ol>
    </>
  )
}

export const updateableInventoryCode = `export function UpdateableInventory({ items, setItems }: Props) {
  const [sortBy, setSortBy] = useState<keyof Item>("name")

  const sortedItems = [...items].sort(sortFunction(sortBy))

  const handleClick = (sortBy: keyof Item) => {
    setSortBy(sortBy)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return
      const indexToUpdate = Number.parseInt(event.key)
      const itemToUpdate = sortedItems[indexToUpdate]
      setItems &&
        setItems(
          items.map((item) =>
            item === itemToUpdate ? { ...item, count: --item.count } : item
          )
        )
    }

    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [items, setItems, sortedItems])

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

export function InventoryManager({
  isCurrent,
  inventoryComponent: Inventory,
}: {
  isCurrent: boolean
  inventoryComponent: any
}) {
  const [inventory, setInventory] = useState(items)
  const nameRef = useRef<HTMLInputElement>(null)

  const handleAddItem = (event: FormEvent) => {
    event.preventDefault()
    const itemName = nameRef.current?.value
    if (!itemName) return

    const existingItem = inventory.find((item) => item.name === itemName)
    if (existingItem) {
      setInventory(
        inventory.map((item) =>
          item === existingItem ? { ...item, count: item.count + 1 } : item
        )
      )
    } else {
      setInventory([...inventory, { name: itemName, type: "custom", count: 1 }])
    }
    nameRef.current.value = ""
  }

  return (
    <>
      <form onSubmit={handleAddItem}>
        <input ref={nameRef} />
        <button onClick={handleAddItem}>Add</button>
      </form>
      <Inventory
        items={inventory}
        setItems={setInventory}
        isCurrent={isCurrent}
      />
    </>
  )
}

export const addToInventoryNotWorkingCode = `export function InventoryManager() {
  const [inventory, setInventory] = useState(items)

  const handleAddItem = (event: FormEvent) => {...}

  return (
    <>
      <form onSubmit={handleAddItem}>
        <input ref={nameRef} />
        <button onClick={handleAddItem}>Add</button>
      </form>
      <Inventory items={inventory} />
    </>
  )
}`

export const inventoryWithUseEffectCode = `export function InventoryWithUseEffect({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...sortedItems].sort(sortFunction(sortBy)))
  }

  useEffect(() => {
    setSortedItems(items)
  }, [items])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return
      const indexToUpdate = Number.parseInt(event.key)
      setSortedItems(
        sortedItems.map((item, index) =>
          index === indexToUpdate ? { ...item, count: --item.count } : item
        )
      )
    }

    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
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
