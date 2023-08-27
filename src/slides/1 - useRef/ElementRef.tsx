import {
  AcceptTerms,
  AcceptTermsAndSpam,
  acceptTermsAndSpamCode,
  acceptTermsCode,
} from "../../demos/AcceptTerms"
import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"
import {
  BasicUseRefImplementation,
  MultpleRefsUseRefImplementation,
} from "./BasicUseRefImplementation"

export function ElementRef() {
  const onSubmit = () => alert("Thank you for your submission")
  const onSubmitWithSpam = (subscribe?: boolean) => {
    const message = `Thank you for your submission.${
      subscribe ? " You have been subscribed to our newsletter." : ""
    }`
    alert(message)
  }

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
        <AcceptTermsAndSpam onSubmit={onSubmitWithSpam} />
        <Fragment>
          <Code>{acceptTermsAndSpamCode}</Code>
        </Fragment>
        <Notes>
          we can just add more useRefs, but it breaks our basic useRef
          implementation
        </Notes>
      </Slide>

      <BasicUseRefImplementation />
      <MultpleRefsUseRefImplementation />
      <Slide>multiple refs diagram/animation</Slide>
    </>
  )
}
