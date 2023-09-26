import { useRef, useState } from "react"
import { Props, addItemToInventory, items } from "./utils"
import { useDodgyEventHandlers } from "."
import { Slide } from "../../helpers/Slide"
import { AddItemForm } from "./AddItemForm"

export function WithoutUseEffectSlide() {
  const slideRef = useRef(null)
  const { isCurrent, addEventHandler } = useDodgyEventHandlers(slideRef.current)

  return (
    <Slide ref={slideRef}>
      <InventoryWithoutUseEffect
        addEventHandler={addEventHandler}
        isCurrent={isCurrent}
      />
    </Slide>
  )
}

function InventoryWithoutUseEffect({
  isCurrent,
  addEventHandler,
}: {
  isCurrent: boolean
  addEventHandler: (handler: any) => void
}) {
  const [inventory, setInventory] = useState(items)

  const addItem = (name: string, count?: string) => {
    const updatedInventory = addItemToInventory(inventory, name, count)
    setInventory(updatedInventory)
  }

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <WithoutUseEffect
        items={inventory}
        setItems={setInventory}
        addEventHandler={addEventHandler}
        isCurrent={isCurrent}
      />
    </>
  )
}

function WithoutUseEffect({
  items,
  setItems,
  addEventHandler,
  isCurrent,
}: Props) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key) - 1
    setItems(
      items.map((item, index) =>
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
      <ol>
        {items.map((item) => (
          <li key={item.name}>
            {item.name} {item.count}
          </li>
        ))}
      </ol>
    </>
  )
}

export const withoutUseEffectCode = `export function ItemList({ items, setItems }: Props) {

  window.addEventListener("keydown", (event) => {
    if (!event.key.match(/^[1-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key) - 1
    setItems(
      items.map((item, index) =>
        index === indexToUpdate ? 
          { ...item, count: --item.count } : 
          item
      )
    )
  })

  return (...)
}
`
