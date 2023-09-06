import { useRef } from "react"
import {
  InventorySlide,
  items,
  useDodgyEventHandlers,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"
import {
  WithoutUseEffect,
  abridgedWithoutUseEffectCode,
  withoutUseEffectCode,
} from "../../demos/Inventory/KeyboardShortcuts"

export function KeyboardShortcuts() {
  const withoutUseEffectRef = useRef(null)
  const { addEventHandler, isCurrent } = useDodgyEventHandlers(
    withoutUseEffectRef.current
  )

  return (
    <>
      <InventorySlide />
      <Slide>
        <Code fontSize=".5em" highlightLines="8-19|8|9|11|12-18">
          {withoutUseEffectCode}
        </Code>
      </Slide>
      <Slide ref={withoutUseEffectRef}>
        <WithoutUseEffect
          items={items}
          addEventHandler={addEventHandler}
          isCurrent={isCurrent}
        />
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="">
          {abridgedWithoutUseEffectCode}
        </Code>
      </Slide>
    </>
  )
}
