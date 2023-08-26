import React, { useEffect } from "react"
import Reveal from "reveal.js"
import { options } from "./revealOptions"

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
        <section> hello </section>
        <section> slide 2</section>
      </div>
    </div>
  )
}
