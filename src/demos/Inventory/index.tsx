import { useCallback, useEffect, useRef, useState } from "react"
import { useDeck } from "../../Deck"
import { items } from "./utils"

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
export { items }
