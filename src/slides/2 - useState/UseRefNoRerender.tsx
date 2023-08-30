import {
  AcceptTermsWithErrorMessages,
  AcceptTermsWithErrorMessagesNoState,
  acceptTermsWithErrorNoStateCode,
  onSubmit,
} from "../../demos/AcceptTerms"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { FunctionalComponentProblems } from "../0 - intro/FunctionalComponentsProblems"

export function UseRefNoRerender() {
  return (
    <>
      <Slide>
        <AcceptTermsWithErrorMessages onSubmit={onSubmit} />
      </Slide>

      <Slide>
        <Code fontSize="0.4em" highlightLines="|3|6-7|18">
          {acceptTermsWithErrorNoStateCode}
        </Code>
        <AcceptTermsWithErrorMessagesNoState onSubmit={onSubmit} />
      </Slide>

      <FunctionalComponentProblems />
      <ShinyTitle title="useState" />
      <InverseTitle>
        <h2>useState</h2>
        <ul>
          <Fragment as="li">maintain data between renders</Fragment>
          <Fragment as="li">trigger render when that data changes</Fragment>
        </ul>
      </InverseTitle>
    </>
  )
}
