import React, { useEffect } from "react"
import Reveal from "reveal.js"
import { options } from "./revealOptions"
import { Intro } from "./slides/0 - intro"
import { UseRef } from "./slides/1 - useRef"
import { UseState } from "./slides/2 - useState"
import { UseEffect } from "./slides/3 - useEffect"

export default function Deck() {
  useEffect(() => {
    const deck = new Reveal({
      ...options,
      plugins: [],
    })
    deck.initialize()
  }, [])

  return (
    <div className="reveal">
      <div className="slides">
        <Intro />
        <UseRef />
        <UseState />
        <UseEffect />
      </div>
    </div>
  )
}
