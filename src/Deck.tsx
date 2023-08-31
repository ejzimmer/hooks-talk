import React, {
  PropsWithChildren,
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from "react"
import Reveal, { Api } from "reveal.js"
import { options } from "./revealOptions"
import { Intro } from "./slides/0 - intro"
import { UseRef } from "./slides/1 - useRef"
import { UseState } from "./slides/2 - useState"
import { UseEffect } from "./slides/3 - useEffect"
import { UseMemo } from "./slides/4 - useMemo"
import RevealHighlight from "reveal.js/plugin/highlight/highlight"

import "reveal.js/plugin/highlight/monokai.css"
import { Slide } from "./helpers/Slide"

const DeckContext = createContext<Api | null>(null)

function DeckProvider({ deck, children }: PropsWithChildren<{ deck?: Api }>) {
  return (
    <DeckContext.Provider value={deck ?? null}>{children}</DeckContext.Provider>
  )
}

export function useDeck() {
  return useContext(DeckContext)
}

export default function Deck() {
  const [deck, setDeck] = useState<Api>()

  useEffect(() => {
    const deck = new Reveal({
      ...options,
      plugins: [RevealHighlight],
    })
    deck.initialize()
    setDeck(deck)
  }, [])

  return (
    <DeckProvider deck={deck}>
      <div className="reveal">
        <div className="slides">
          <AllSlides />
        </div>
      </div>
    </DeckProvider>
  )
}

const AllSlides = memo(() => (
  <>
    <Intro />
    <UseRef />
    <UseState />
    <UseEffect />
    <UseMemo />
    <Slide>conclusion</Slide>
    <Slide>further reading</Slide>
    <Slide>thanks</Slide>
  </>
))
