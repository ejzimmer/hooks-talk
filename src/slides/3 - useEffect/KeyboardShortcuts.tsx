import { useRef } from "react"
import {
  items,
  slowInventoryCode,
  BrokenInventory,
  Inventory,
  abridgedSlowInventoryCode,
  useDodgyEventHandlers,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"

export function KeyboardShortcuts() {
  const brokenInventoryRef = useRef(null)
  const { addEventHandler, isCurrent } = useDodgyEventHandlers(
    brokenInventoryRef.current
  )

  return (
    <>
      <Slide>
        <Inventory items={items} />
      </Slide>
      <Slide>
        <Code fontSize=".5em" highlightLines="8-19|8|9|11|12-18">
          {slowInventoryCode}
        </Code>
      </Slide>
      <Slide ref={brokenInventoryRef}>
        <BrokenInventory
          items={items}
          addEventHandler={addEventHandler}
          isCurrent={isCurrent}
        />
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="">
          {abridgedSlowInventoryCode}
        </Code>
      </Slide>
    </>
  )
}
