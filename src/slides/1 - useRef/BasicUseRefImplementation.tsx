import { Code } from "../../helpers/Code"
import { Notes, Slide } from "../../helpers/Slide"
import { useDeck } from "../../Deck"
import { abridgedRenderCounterCode } from "../../demos/RenderCounter"
import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { abridgedAcceptTermsAndSpamCode } from "../../demos/AcceptTerms"

export const singleRefCode = `// somewhere in React's code
let ref = {} as { current?: any }

export function useRef(initialValue: any) {
  if (!('current' in ref)) {
    ref.current = initialValue
  }

  return ref
}
`

export const noCurrentCode = `// in our code
export function RenderCounter() {
  const numberOfRenders = useRef(0)

  numberOfRenders = numberOfRenders + 1

  return (...);
}
`

function useFragment(slideRef: RefObject<HTMLElement>, eventName: string) {
  const deck = useDeck()
  const [fragment, setFragment] = useState(-1)

  const onKeyDown = useCallback(() => {
    setFragment(Number.parseInt(slideRef.current?.dataset.fragment ?? "-1"))
  }, [slideRef])

  useEffect(() => {
    if (deck) {
      deck.addEventListener(eventName, function () {
        window.addEventListener("keydown", onKeyDown)
      })
    }

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [deck, onKeyDown, eventName])

  return fragment
}

function BoxPic(style: Record<string, string>) {
  return (
    <img
      alt=""
      src="./box.jpeg"
      style={{ position: "absolute", ...style }}
    ></img>
  )
}

export function BasicUseRefImplementation() {
  const slideRef = useRef<HTMLElement>(null)
  const fragment = useFragment(slideRef, "simple-use-ref")

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
          <BoxPic top="0" />

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

export function UseRefWithoutCurrent() {
  const slideRef = useRef<HTMLElement>(null)
  const fragment = useFragment(slideRef, "use-ref-no-current")

  return (
    <Slide ref={slideRef} data-state="use-ref-no-current">
      <div style={{ position: "relative" }}>
        <Code
          fontSize="0.34em"
          highlightLines="2|14|4-7, 14|4-7,14|9, 14|14|16|16|18|13|14|4,14|5,14|9,14|9,14|14|16|16|18"
        >
          {singleRefCode + "\n" + abridgedRenderCounterCode}
        </Code>
        <BoxPic top="0" />
        {fragment > 5 && <BoxPic top="unset" bottom="-50px" right="100px" />}
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
        {((fragment > 3 && fragment < 6) || fragment > 12) && (
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
    </Slide>
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
      <div>
        <Code
          fontSize="0.34em"
          highlightLines="2,3|21,22|22,5-8|22,10|22,11|22,13|22|23|23,5-8|23,10|23,11|23,13|23|31|16-18|25-29"
        >
          {multipleRefsCode + "\n" + abridgedAcceptTermsAndSpamCode}
        </Code>
      </div>
      <Notes>
        <ul>
          <li>refs array per component</li>
          <li>after the component renders, we need to reset current index</li>
        </ul>
      </Notes>
    </Slide>
  )
}
