import {
  InventoryWithoutCleanup,
  inventoryCode,
  items,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { Rendering } from "./Rendering"
import { KeyboardShortcuts } from "./KeyboardShortcuts"

export function UseEffect() {
  return (
    <>
      <KeyboardShortcuts />
      <ShinyTitle title="useEffect" />
      <InverseTitle>
        <h2>useEffect</h2>
        <Fragment>handle stuff that's not managed by React</Fragment>
      </InverseTitle>
      <Slide>
        <ul>
          <li>native event handlers</li>
          <Fragment as="li">
            setTimeout/setInterval/requestAnimationFrame
          </Fragment>
          <Fragment as="li">making API calls</Fragment>
          <Fragment as="li">interacting with 3rd party libraries</Fragment>
        </ul>
      </Slide>
      <Slide>
        <Code>{inventoryCode}</Code>
        <Slide renderOnVisible={true}>
          <InventoryWithoutCleanup items={items} />
        </Slide>
      </Slide>
      <Rendering />
    </>
  )
}
