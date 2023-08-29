import { Code } from "../../helpers/Code"
import { Notes, Slide } from "../../helpers/Slide"
import { useDeck } from "../../Deck"
import { abridgedRenderCounterCode } from "../../demos/RenderCounter"
import { useCallback, useEffect, useRef, useState } from "react"

export const singleRefCode = `// somewhere in React's code
let ref = {} as { current?: any }

export function useRef(initialValue: any) {
  if (!('current' in ref)) {
    ref.current = initialValue
  }

  return ref
}
`

export function BasicUseRefImplementation() {
  const deck = useDeck()
  const slideRef = useRef<HTMLElement>(null)
  const [fragment, setFragment] = useState(-1)

  const onKeyDown = useCallback(() => {
    setFragment(Number.parseInt(slideRef.current?.dataset.fragment ?? "-1"))
  }, [])

  useEffect(() => {
    if (deck) {
      deck.addEventListener("simple-use-ref", function () {
        window.addEventListener("keydown", onKeyDown)
      })
    }

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [deck, onKeyDown])

  return (
    <>
      <Slide data-transition="slide-in fade-out">
        <Code fontSize="0.34em">
          {singleRefCode + "\n" + abridgedRenderCounterCode}
        </Code>
      </Slide>

      <Slide
        ref={slideRef}
        data-state="simple-use-ref"
        data-transition="fade-in slide-out"
      >
        <div style={{ position: "relative" }}>
          <Code
            fontSize="0.34em"
            highlightLines="2|14|4-7, 14|4-7,14|9, 14|14|16|16|18|13|14|4,14|5,14|9,14|9,14|14|16|16|18"
          >
            {singleRefCode + "\n" + abridgedRenderCounterCode}
          </Code>
          <img
            alt=""
            src="./box.jpeg"
            style={{ position: "absolute", top: "0" }}
          ></img>
          {fragment > 1 && (
            <div
              style={{
                position: "absolute",
                top: "70px",
                right: "250px",
                transform: "rotate(-.15turn)",
              }}
            >
              current: {fragment < 6 ? 0 : fragment < 16 ? 1 : 2}
            </div>
          )}
          {((fragment > 3 && fragment < 8) || fragment > 12) && (
            <div
              style={{
                width: "219px",
                border: "4px solid rebeccapurple",
                position: "absolute",
                bottom: "100px",
                left: "285px",
                transformOrigin: "bottom left",
                transform: "rotate(-.05turn)",
              }}
            />
          )}
        </div>

        <Notes>
          <ul>
            <li>this code can only deal with one call to useRef</li>
            <li>
              in reality, each component would have its own version of this
            </li>
            <li>
              we'll look at how to deal with multiple calls to useRef in a
              minute
            </li>
            <li>
              also, the real code doesn't reset the value to initialValue when
              you set it to undefined, just didn't want to complicate tracking
              whether it had been set
            </li>
          </ul>
          - - - -
        </Notes>
      </Slide>
    </>
  )
}

const multipleRefsCode = `// somewhere in React's code
const refs = [] as { current?: any }[];
let currentIndex = 0;

export function useRef(initialValue: any) {
  if (typeof refs[currentIndex] === "undefined") {
    refs[currentIndex] = { current: initialValue }
  }

  const ref = refs[currentIndex]
  currentIndex++

  return ref
}

function after() {
  currentIndex = 0
}
`

export function MultpleRefsUseRefImplementation() {
  return (
    <Slide>
      <Code>{multipleRefsCode}</Code>
      <Notes>
        <ul>
          <li>refs array per component</li>
          <li>after the component renders, we need to reset current index</li>
        </ul>
      </Notes>
    </Slide>
  )
}
