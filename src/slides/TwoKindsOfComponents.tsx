import { Code } from "../helpers/Code"
import { Fragment, Slide } from "../helpers/Slide"

const classBasedComponent = `class FancyButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.props.onClick.bind(this);
  }

  render() {
    return (
      <button style={fancyStyle} onClick={this.onClick}>
        {this.props.children}
      </button>
    );  
  }
}`
const functionalComponent = `function FancyButton ({ onClick, children }) {
  return (
    <button style={fancyStyle} onClick={onClick}>
      {children}
    </button>
  }`

export function TwoKindsOfComponents() {
  return (
    <Slide>
      <Fragment>
        <Code>{classBasedComponent}</Code>
      </Fragment>
      <Fragment>
        <Code>{functionalComponent}</Code>
      </Fragment>
      <aside className="notes">
        - used React for a while, remember that there are two ways to write
        React components: classes & functions
      </aside>
    </Slide>
  )
}
