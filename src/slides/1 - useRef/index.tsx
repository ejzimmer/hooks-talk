import {
  RenderCounterWithRerender,
  renderCounterCode,
} from "../../demos/RenderCounter"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, Slide } from "../../helpers/Slide"
import {
  BasicUseRefImplementation,
  UseRefWithoutCurrent,
} from "./BasicUseRefImplementation"
import { ElementRef } from "./ElementRef"
import { RulesOfHooks } from "./RulesOfHooks"

export function UseRef() {
  return (
    <>
      <InverseTitle>
        <h2>useRef</h2>
        <div>maintain data between renders</div>
      </InverseTitle>
      <Slide>
        <Code>{renderCounterCode}</Code>
        <RenderCounterWithRerender />
      </Slide>
      <BasicUseRefImplementation />
      <UseRefWithoutCurrent />
      <Slide>
        <Code>{timedButtonCode}</Code>
      </Slide>
      <ElementRef />
      <RulesOfHooks />
    </>
  )
}

const timedButtonCode = `function TimedButton({ onClick, children }: Props) {
  const startTime = useRef(new Date().getTime())

  const handleClick = () => {
    const endTime = new Date().getTime();
    logTime(endTime - startTime)
    onClick()
  }

  return <button onClick={handleClick}>{children}</button>
}`
