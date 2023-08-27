import { Code } from "../../helpers/Code"
import { Notes, Slide } from "../../helpers/Slide"

const singleRefCode = `// somewhere in React's code
let ref = {} as { current?: any }

export function useRef(initialValue: any) {
  if (typeof ref.current === "undefined") {
    ref.current = initialValue
  }

  return ref
}
`

export function BasicUseRefImplementation() {
  return (
    <Slide>
      <Code>{singleRefCode}</Code>
      <Notes>
        <ul>
          <li>this code can only deal with one call to useRef</li>
          <li>in reality, each component would have its own version of this</li>
          <li>
            we'll look at how to deal with multiple calls to useRef in a minute
          </li>
          <li>
            also, the real code doesn't reset the value to initialValue when you
            set it to undefined, just didn't want to complicate tracking whether
            it had been set
          </li>
        </ul>
        - - - -
      </Notes>
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
