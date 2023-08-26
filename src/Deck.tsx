import React, { useEffect } from "react"
import Reveal from "reveal.js"
import { options } from "./revealOptions"
import { Title } from "./slides/Title"
import { TwoKindsOfComponents } from "./slides/TwoKindsOfComponents"
import { WhyFunctionalComponents } from "./slides/WhyFunctionalComponents"

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
        <Title />
        <TwoKindsOfComponents />
        <WhyFunctionalComponents />
      </div>
    </div>
  )
}
