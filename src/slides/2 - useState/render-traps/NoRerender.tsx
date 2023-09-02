import {
  AcceptTermsWithDisappearingErrorMessages,
  onSubmit,
  disappearingErrorMessageCode,
} from "../../../demos/AcceptTerms"
import { Code } from "../../../helpers/Code"
import { Slide, Notes, Fragment } from "../../../helpers/Slide"

export function NoRerender() {
  return (
    <Slide>
      <h2>Only render on change</h2>
      <AcceptTermsWithDisappearingErrorMessages onSubmit={onSubmit} />
      <Fragment>
        <Code fontSize="0.4em" highlightLines="4-8">
          {disappearingErrorMessageCode}
        </Code>
      </Fragment>
      <Notes>
        <ul>
          <li>far more likely to cause a problem</li>
          <li>
            first version is ok, won't cause a problem but would be better
            without state
          </li>
        </ul>
      </Notes>
    </Slide>
  )
}
