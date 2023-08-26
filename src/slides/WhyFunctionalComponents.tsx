import { Fragment, Notes, Slide } from "../helpers/Slide"

export function WhyFunctionalComponents() {
  return (
    <Slide>
      <h2>
        Why we like
        <br /> functional components
      </h2>
      <ul>
        <Fragment as="li">Pure functions, easier to reason about</Fragment>
        <Fragment as="li">Don't have to worry about lifecycle methods</Fragment>
        <Fragment as="li">Less boilerplate</Fragment>
        <Fragment as="li">Easier to write tooling for</Fragment>
      </ul>
      <Notes>
        - at this point, we've all kind of agreed that we like functional
        components more, for a bunch of reasons that aren't super relevant to
        this talk - but, they do have a major downside
      </Notes>
    </Slide>
  )
}
