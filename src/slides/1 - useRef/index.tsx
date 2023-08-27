import {
  RenderCounterWithRerender,
  renderCounterCode,
} from "../../demos/RenderCounter"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, Slide } from "../../helpers/Slide"
import { BasicUseRefImplementation } from "./BasicUseRefImplementation"
import { ElementRef } from "./ElementRef"
import { RulesOfHooks } from "./RulesOfHooks"

export function UseRef() {
  return (
    <>
      <InverseTitle>
        <div>useRef</div>
        <Fragment>maintain data between renders</Fragment>
      </InverseTitle>
      <Slide>
        <Code>{renderCounterCode}</Code>
        <RenderCounterWithRerender />
      </Slide>
      <BasicUseRefImplementation />
      <Slide>use ref diagram/animation</Slide>
      <ElementRef />
      <RulesOfHooks />
    </>
  )
}
