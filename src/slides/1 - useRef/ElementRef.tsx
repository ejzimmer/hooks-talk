import {
  AcceptTerms,
  AcceptTermsAndSpam,
  acceptTermsAndSpamCode,
  acceptTermsCode,
  onSubmit,
} from "../../demos/AcceptTerms"
import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"
import {
  BasicUseRefImplementation,
  MultpleRefsUseRefImplementation,
  singleRefCode,
} from "./BasicUseRefImplementation"

export function ElementRef() {
  return (
    <>
      <Slide>
        <AcceptTerms onSubmit={onSubmit} />
        <Fragment>
          <Code>{acceptTermsCode}</Code>
        </Fragment>
        <Notes>
          <ul>
            <li>probably most common use of useRef</li>
            <li>but what if there are multiple fields in our form?</li>
          </ul>
        </Notes>
      </Slide>

      <Slide>
        <AcceptTermsAndSpam onSubmit={onSubmit} />
        <Fragment>
          <Code fontSize="0.4em">{acceptTermsAndSpamCode}</Code>
        </Fragment>
        <Notes>
          we can just add more useRefs, but it breaks our basic useRef
          implementation
        </Notes>
      </Slide>

      <Slide>
        <Code>{singleRefCode}</Code>
      </Slide>
      <MultpleRefsUseRefImplementation />
    </>
  )
}
