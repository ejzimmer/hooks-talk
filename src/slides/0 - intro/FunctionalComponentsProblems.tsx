import { Slide } from "../../helpers/Slide"

export function FunctionalComponentProblems() {
  return (
    <Slide>
      <h2>Some problems with functional components</h2>
      <ol>
        <li>They can't store state</li>
        <li>They can't trigger re-renders</li>
      </ol>
    </Slide>
  )
}
