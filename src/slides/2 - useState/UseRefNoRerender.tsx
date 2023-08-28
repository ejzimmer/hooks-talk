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
        <Code fontSize="0.4em">{acceptTermsWithErrorNoStateCode}</Code>
        <AcceptTermsWithErrorMessagesNoState onSubmit={onSubmit} />
      </Slide>

      <FunctionalComponentProblems highlighted={1} />
      <ShinyTitle title="useState" />
      <InverseTitle>
        <div>useState</div>
        <Fragment>maintain data between renders</Fragment>
        <Fragment>trigger render when that data changes</Fragment>
      </InverseTitle>
    </>
  )
}
