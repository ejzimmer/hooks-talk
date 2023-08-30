import {
  AcceptTermsWithErrorMessages,
  acceptTermsWithErrorMessageCode,
  onSubmit,
} from "../../demos/AcceptTerms"
import { Code } from "../../helpers/Code"
import { Notes, Slide } from "../../helpers/Slide"

export function UseStateImplementation() {
  return (
    <>
      <Slide>
        <Code fontSize="0.4em" highlightLines="|3|6-7|19|">
          {acceptTermsWithErrorMessageCode}
        </Code>
        <AcceptTermsWithErrorMessages onSubmit={onSubmit} />
        <Notes>usage of useState is quite different to useRef...</Notes>
      </Slide>

      <Slide>
        <Code
          fontSize="0.45em"
          highlightLines="|2-3|26-27|28|28,5-13|28,8|28,9-11|28,15|28,16|28,17|28|32|20-23|"
        >
          {useStateImplementationCode +
            "\n" +
            "// in our component\n" +
            acceptTermsWithErrorMessageCode}
        </Code>
        <Notes>
          <ul>
            <li>needs to return value & setter function</li>
            <li>why a tuple instead of an object? nfi</li>
          </ul>
        </Notes>
      </Slide>
    </>
  )
}

const useStateImplementationCode = `// somewhere in React's code
const state: [T, Dispatch<React.SetStateAction<T>>][] = []
let currentIndex = 0

export function useState<T>(initialValue: T): [T, (value: T) => void] {
  if (typeof state[stateIndex] === "undefined") {
    state[currentIndex] = [
      initialValue,
      (value: T) => {
        state[currentIndex][0] = value
      },
    ]
  }

  const thisState = state[currentIndex]
  currentIndex++
  return thisState
}

export function afterState() {
  currentIndex = 0
  renderIfRequired()
}            
`
