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
import { Fragment, Slide } from "./helpers/Slide"
import { UseCallback } from "./slides/5 - useCallback"

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
    <UseCallback />
    <Slide>
      <h2>What have we learnt?</h2>
      <ul>
        <Fragment as="li">Hooks are basically arrays in closures</Fragment>
        <Fragment as="li">
          useRef & useState let us store data between renders
        </Fragment>
        <Fragment as="li">useState triggers re-renders</Fragment>
        <Fragment as="li">useEffect is an escape hatch</Fragment>
        <Fragment as="li">useMemo & useCallback memoise things</Fragment>
      </ul>
    </Slide>
    <Slide>
      <h2>Further reading</h2>
      <ul>
        <li>
          <a href="https://www.swyx.io/hooks">
            Swyx's Getting Closure on React Hooks
          </a>
        </li>
        <li>
          <a href="https://advanced-react.com">
            Advanced React by Nadia Makarevich
          </a>
        </li>
        <li>
          <a href="https://justjavascript.com/">
            Dan Abramov's Just JavaScript
          </a>
        </li>
        <li>
          <a href="https://artsyomni.com/hyliaserif/download">
            Omni Jacala's Hylia Serif
          </a>
        </li>
      </ul>
    </Slide>
    <Slide>
      <h2>thanks</h2>
    </Slide>
  </>
))
