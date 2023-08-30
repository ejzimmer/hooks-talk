import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  items,
  slowInventoryCode,
  BrokenInventory,
  Inventory,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"
import { useDeck } from "../../Deck"

export function KeyboardShortcuts() {
  const deck = useDeck()
  const brokenInventoryRef = useRef(null)
  const handlers = useRef<any[]>([])
  const [, setBrokenIsCurrent] = useState(false)

  const addEventHandler = useCallback((handler: any) => {
    handlers.current.push(handler)
  }, [])

  useEffect(() => {
    deck &&
      deck.addEventListener("slidechanged", (event: any) => {
        if (event.currentSlide !== brokenInventoryRef.current) {
          handlers.current.forEach((handler) => {
            window.removeEventListener("keydown", handler)
            setBrokenIsCurrent(false)
          })
        } else {
          setBrokenIsCurrent(true)
        }
      })
  }, [deck])

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
        <BrokenInventory items={items} addEventHandler={addEventHandler} />
      </Slide>
      <Slide>
        <Code fontSize=".5em" highlightLines="8-19">
          {slowInventoryCode}
        </Code>
      </Slide>
    </>
  )
}
