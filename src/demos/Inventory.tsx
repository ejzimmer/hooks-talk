import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useDeck } from "../Deck"
import { Slide } from "../helpers/Slide"

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

type Props = {
  items: Item[]
  setItems?: (items: Item[]) => void
  consumeItem?: (item: Item) => void
  addEventHandler?: any
  isCurrent?: boolean
}

export const infiniteLoopInventoryCode = `export function FilteredItems({ items, filterType }: Props) {
  const [filteredItems, setFilteredItems] = useState(items)

  if (filterType) {
    setFilteredItems(
      items.filter((item) => item.type === filterType)
    )
  }

  return (
    <ul>
      {filteredItems.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  )
}`

export const sortedItemsCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(items.toSorted(sortFunction(sortBy)))
  }

  return (
    <>...</>
  )
}`

export const brokenSortedItemsCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(items.sort(sortFunction(sortBy)))
  }

  return (
    <>
      <button onClick={() => handleClick("name")}>
        Sort by name
      </button>
      <button onClick={() => handleClick("count")}>
        Sort by count
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
}`

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

export function InventoryWithSort({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
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

export function sortFunction(by: keyof Item) {
  return (a: Item, b: Item) => (a[by] === b[by] ? 0 : a[by] < b[by] ? -1 : 1)
}

export const slowInventoryCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
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

export const abridgedSlowInventoryCode = `export function Inventory({ items }: Props) {
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

export function BrokenInventory({ items, addEventHandler, isCurrent }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
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

export const inventoryCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
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

export const inventoryWithoutCleanupCode = `export function Inventory({ items }: Props) {
  ...

  useEffect(
    () => {
      window.addEventListener("keydown", (event) => {
        if (!event.key.match(/^[0-9]$/)) return

        const indexToUpdate = Number.parseInt(event.key)
        setSortedItems(
          sortedItems.map((item, index) =>
            index === indexToUpdate ? { ...item, count: --item.count } : item
          )
        )
      })
    }, 
    [sortedItems]
  )

  return (...)
}
`

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

export function Inventory({ items, isCurrent }: Props) {
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

export function InventorySlide() {
  const inventoryRef = useRef(null)
  const { isCurrent } = useDodgyEventHandlers(inventoryRef.current)
  return (
    <Slide ref={inventoryRef}>
      <Inventory items={items} isCurrent={isCurrent} />
    </Slide>
  )
}

export function AddToInventoryNotWorking() {
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
      <Inventory items={inventory} />
    </>
  )
}

export const inventoryWithUseEffectCode = `export function InventoryWithUseEffect({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)))
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

export function UpdateableInventory({ items, setItems }: Props) {
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
      const indexToUpdate = Number.parseInt(event.key)
      const itemToUpdate = sortedItems[indexToUpdate]
      consumeItem(itemToUpdate)
    }

    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [items, setItems, sortedItems, consumeItem])

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

export function AddToInventory() {
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
      <UpdateableInventory items={inventory} setItems={setInventory} />
    </>
  )
}

export const extractConsumeItemCode = `const consumeItem = (item: Item) => {
  setItems &&
    setItems(items.map((i) => (item === i ? { ...i, count: --i.count } : i)))
}

useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.key.match(/^[0-9]$/)) return
    const indexToUpdate = Number.parseInt(event.key)
    const itemToUpdate = sortedItems[indexToUpdate]
    consumeItem(itemToUpdate)
  }

  window.addEventListener("keydown", onKeyDown)

  return () => window.removeEventListener("keydown", onKeyDown)
}, [items, setItems, sortedItems, consumeItem])
`

export const memoisedConsumeItem = `const consumeItem = useMemo(() => (item: Item) => {
  setItems &&
    setItems(items.map((i) => (i === item ? { ...i, count: --i.count } : i)))
}, [items, setItems])
`

export const callbackisedConsumeItem = `  const consumeItem = useCallback((item: Item) => {
  setItems &&
    setItems(items.map((i) => (i === item ? { ...i, count: --i.count } : i)))
}, [items, setItems])
`

export function useDodgyEventHandlers(slideRef: HTMLElement | null) {
  const deck = useDeck()
  const handlers = useRef<any[]>([])
  const [isCurrent, setIsCurrent] = useState(false)

  const addEventHandler = useCallback((handler: any) => {
    handlers.current.push(handler)
  }, [])

  // just in case we reload the page with the component already loaded
  useEffect(() => {
    slideRef && setIsCurrent(slideRef.classList.contains("present"))
  }, [slideRef])

  useEffect(() => {
    deck &&
      deck.addEventListener("slidechanged", (event: any) => {
        if (event.currentSlide !== slideRef) {
          handlers.current.forEach((handler) => {
            window.removeEventListener("keydown", handler)
            setIsCurrent(false)
          })
        } else {
          setIsCurrent(true)
        }
      })
  }, [deck, slideRef])

  return { addEventHandler, isCurrent }
}
