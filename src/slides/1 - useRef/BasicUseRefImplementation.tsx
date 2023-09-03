import { Code } from "../../helpers/Code"
import { Notes, Slide } from "../../helpers/Slide"
import { abridgedAcceptTermsAndSpamCode } from "../../demos/AcceptTerms"
import { SingleRefImplementation, singleRefCode } from "./SingleRef"
import { NoCurrentRef } from "./NoCurrentRef"
import { abridgedRenderCounterCode } from "../../demos/RenderCounter"

export function BasicUseRefImplementation() {
  return (
    <>
      <SingleRefImplementation />
      <NoCurrentRef />
      <Slide>
        <Code>{singleRefCode}</Code>
        <Code>{abridgedRenderCounterCode}</Code>
      </Slide>
    </>
  )
}

export function RefContainer({
  isBackground,
  current,
}: {
  isBackground?: boolean
  current?: string
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        display: "flex",
        gap: ".25em",
        alignItems: "center",
        opacity: isBackground ? ".4" : 1,
      }}
    >
      <code>ref</code>➡️
      <img alt="a container" src="./box.jpeg" style={{ width: "150px" }} />
      {current && (
        <div
          style={{
            position: "absolute",
            right: "0",
            width: "150px",
            color: "black",
          }}
        >
          {current}
        </div>
      )}
    </div>
  )
}
export function CountContainer() {
  return (
    <div
      style={{
        position: "absolute",
        top: "115px",
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>⬆️</div>
      <code>count</code>
    </div>
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
          highlightLines="|2,3|21,22|22,5-8|22,10|22,11|22,13|22|23|23,5-8|23,10|23,11|23,13|23|31|16-18|25-29|"
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
