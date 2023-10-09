import { Slide } from "../../helpers/Slide"

export function FunctionalComponentProblems() {
  return (
    <Slide>
      <h2>
        What's wrong with
        <br /> Functional Components
      </h2>
      <ul>
        <li>They can't store state</li>
        <li>They can't trigger re-renders</li>
        <li>No lifecycle methods</li>
      </ul>
    </Slide>
  )
}
