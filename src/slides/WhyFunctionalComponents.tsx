import { Notes } from "../helpers/Slide"

export function WhyFunctionalComponents() {
  return (
    <>
      <ul>
        <li>Pure functions, easier to reason about</li>
        <li>Don't have to worry about lifecycle methods</li>
        <li>Less boilerplate</li>
        <li>Easier to write tooling for</li>
      </ul>
      <Notes>
        - at this point, we've all kind of agreed that we like functional
        components more, for a bunch of reasons that aren't super relevant to
        this talk - but, they do have a major downside
      </Notes>
    </>
  )
}
