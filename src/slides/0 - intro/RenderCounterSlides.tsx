import {
  BrokenRenderCounterWithRerender,
  RenderCounterWithRerender,
} from "../../demos/RenderCounter"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"

const classComponentCode = `class RenderCounter extends React.Component {
  constructor(props) {
    super(props);
    this.numberOfRenders = 0;
  }
  render() {
    this.numberOfRenders++;
    return <div>This component has rendered {this.numberOfRenders} times</div>  
  }
}`

const brokenFunctionalComponentCode = `function BrokenRenderCounter() {
  let numberOfRenders = 0

  numberOfRenders++

  return <div>This component has rendered {numberOfRenders} times</div>
}
`

export function ClickCounterSlides() {
  return (
    <>
      <Slide>
        <RenderCounterWithRerender />
      </Slide>
      <Slide>
        <Code>{classComponentCode}</Code>
      </Slide>
      <Slide>
        <Code>{brokenFunctionalComponentCode}</Code>
        <BrokenRenderCounterWithRerender />
      </Slide>
    </>
  )
}
