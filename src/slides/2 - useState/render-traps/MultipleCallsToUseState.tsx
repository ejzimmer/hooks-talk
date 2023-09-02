import { Code } from "../../../helpers/Code"
import { Notes, Slide } from "../../../helpers/Slide"

export function MultipleCallsToUseState() {
  return (
    <Slide>
      <h2>One render per task</h2>
      <Code>{multipleUseStatesCode}</Code>
      <Notes>
        almost never comes up, but nice to know it works, in case it does
      </Notes>
    </Slide>
  )
}

const multipleUseStatesCode = `onClick = () => {
  setAllowed(true) // default to allow

  if (actuallyNotAllowed(user)) {
    setAllowed(false)
  }
}
`
