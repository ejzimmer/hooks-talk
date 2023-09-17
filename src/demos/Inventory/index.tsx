import { useCallback, useEffect, useRef, useState } from "react"
import { useDeck } from "../../Deck"
import { Item, addItemToInventory, items as defaultItems } from "./utils"
import { AddItemForm } from "./AddItemForm"
import { ItemList, ItemListWithTooMuchState } from "./ItemList"
import { Slide } from "../../helpers/Slide"

export function InventorySlide({
  hideSortButtons,
  hideFilter,
  items,
}: {
  hideSortButtons?: boolean
  hideFilter?: boolean
  items?: Item[]
}) {
  const inventoryRef = useRef(null)
  const { isCurrent } = useDodgyEventHandlers(inventoryRef.current)
  return (
    <Slide ref={inventoryRef}>
      <Inventory
        isCurrent={isCurrent}
        hideSortButtons={hideSortButtons}
        hideFilter={hideFilter}
        items={items}
      />
    </Slide>
  )
}

export function Inventory({
  isCurrent,
  hideSortButtons,
  hideFilter,
  items = defaultItems,
}: {
  isCurrent: boolean
  hideSortButtons?: boolean
  hideFilter?: boolean
  items?: Item[]
}) {
  const [inventory, setInventory] = useState(items)

  const addItem = (name: string, count?: string) => {
    const updatedInventory = addItemToInventory(inventory, name, count)
    setInventory(updatedInventory)
  }

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <ItemList
        items={inventory}
        setItems={setInventory}
        isCurrent={isCurrent}
        hideSortButtons={hideSortButtons}
        hideFilter={hideFilter}
      />
    </>
  )
}

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

export { defaultItems as items }

export function UnaddableInventory({
  isCurrent,
  hideSortButtons,
  hideFilter,
  items = defaultItems,
}: {
  isCurrent: boolean
  hideSortButtons?: boolean
  hideFilter?: boolean
  items?: Item[]
}) {
  const [inventory, setInventory] = useState(items)

  const addItem = (name: string, count?: string) => {
    const updatedInventory = addItemToInventory(inventory, name, count)
    setInventory(updatedInventory)
  }

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <ItemListWithTooMuchState
        items={inventory}
        setItems={setInventory}
        isCurrent={isCurrent}
        hideSortButtons={hideSortButtons}
        hideFilter={hideFilter}
      />
    </>
  )
}

export function UnaddableInventorySlide({
  hideSortButtons,
  hideFilter,
  items,
}: {
  hideSortButtons?: boolean
  hideFilter?: boolean
  items?: Item[]
}) {
  const inventoryRef = useRef(null)
  const { isCurrent } = useDodgyEventHandlers(inventoryRef.current)
  return (
    <Slide ref={inventoryRef}>
      <UnaddableInventory
        isCurrent={isCurrent}
        hideSortButtons={hideSortButtons}
        hideFilter={hideFilter}
        items={items}
      />
    </Slide>
  )
}
