import {
  BrokenRenderCounterWithRerender,
  RenderCounterWithRerender,
} from "../../demos/RenderCounter"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"

const brokenFunctionalComponentCode = `function RenderCounter() {
  let numberOfRenders = 0;

  numberOfRenders++;

  return (
    <div>
      This component has rendered {numberOfRenders} times
    </div>
  );
}
`

export function RenderCounterSlides() {
  return (
    <>
      <Slide>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            fontSize: "0.6em",
          }}
        >
          <Code>{parentComponentCode}</Code>
          <Code>{renderCounterCode}</Code>
          <div style={{ gridColumn: "span 2", marginTop: "2em" }}>
            <RenderCounterWithRerender />
          </div>
        </div>
      </Slide>
      <Slide>
        <Code highlightLines="|2|4|7-9|1,11|2">
          {brokenFunctionalComponentCode}
        </Code>
        <BrokenRenderCounterWithRerender />
      </Slide>
    </>
  )
}

const parentComponentCode = `class Parent extends Component {
  ...
  render() {
    ...
    return (
      <>
        <button onClick={this.rerender()}>
          Trigger render
        </button>
        <RenderCounter />
      </>
    )
  }
}`

const renderCounterCode = `export function RenderCounter() {
  ...
  return (
    <div>
      This component has rendered 
      {numberOfRenders} times
    </div>
  ) 
}
`
