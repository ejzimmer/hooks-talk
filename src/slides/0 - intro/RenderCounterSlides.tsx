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
    return (
      <div>
        This component has rendered 
        {this.numberOfRenders} times
      </div>
    );  
  }
}`

const brokenFunctionalComponentCode = `function RenderCounter() {
  let numberOfRenders = 0

  numberOfRenders++

  return (
    <div>
      This component has rendered {numberOfRenders} times
    </div>
  )
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
          <div style={{ gridColumn: "span 2" }}>
            <RenderCounterWithRerender />
          </div>
        </div>
      </Slide>
      <Slide>
        <Code fontSize="0.5em" highlightLines="|4|7">
          {classComponentCode}
        </Code>
      </Slide>
      <Slide>
        <Code highlightLines="|2|4|7-9">{brokenFunctionalComponentCode}</Code>
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
  return <div>{numberOfRenders}</div> 
}
`
