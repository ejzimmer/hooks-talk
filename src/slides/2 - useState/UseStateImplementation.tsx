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
        <Code>{acceptTermsWithErrorMessageCode}</Code>
        <AcceptTermsWithErrorMessages onSubmit={onSubmit} />
        <Notes>usage of useState is quite different to useRef...</Notes>
      </Slide>

      <Slide>
        <Code>{useStateImplementationCode}</Code>
        <Notes>
          <ul>
            <li>needs to return value & setter function</li>
            <li>why a tuple instead of an object? nfi</li>
          </ul>
        </Notes>
      </Slide>

      <Slide>demo it working properly</Slide>

      <Slide>useState implementation diagram/animation</Slide>
    </>
  )
}

const useStateImplementationCode = `const state: [any, Dispatch<React.SetStateAction<any>>][] = []
let stateIndex = 0

export function useState<T>(initialValue: T): [T, (value: T) => void] {
  if (typeof state[stateIndex] === "undefined") {
    state[stateIndex] = [
      initialValue,
      (value: T) => {
        state[stateIndex][0] = value
      },
    ]
  }

  const thisState = state[stateIndex]
  stateIndex++
  return thisState
}

export function afterState() {
  stateIndex = 0
  renderIfRequired()
}            
`
