import {
  RenderCounterWithRerender,
  renderCounterCode,
} from "../../demos/RenderCounter"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, Slide } from "../../helpers/Slide"
import { BasicUseRefImplementation } from "./BasicUseRefImplementation"
import { ElementRef } from "./ElementRef"
import { MultipleRefs } from "./MultipleRefs"
import { RulesOfHooks } from "./RulesOfHooks"

export function UseRef() {
  return (
    <>
      <InverseTitle>
        <h2>useRef</h2>
        <ul>
          <Fragment as="li">maintain data between renders</Fragment>
        </ul>
      </InverseTitle>
      <Slide>
        <Code highlightLines="|2|4|6-10">{renderCounterCode}</Code>
        <RenderCounterWithRerender />
      </Slide>
      <BasicUseRefImplementation />
      <Slide>
        <Code>{timedButtonCode}</Code>
      </Slide>
      <ElementRef />
      <MultipleRefs />
      <RulesOfHooks />
      <InverseTitle>
        <ul>
          <Fragment as="li">Hooks store data in arrays & closures</Fragment>
          <Fragment as="li">Each component has its own array/closure</Fragment>
        </ul>
      </InverseTitle>
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
