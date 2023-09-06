import { items, useDodgyEventHandlers } from "../../demos/Inventory"
import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { KeyboardShortcuts } from "./KeyboardShortcuts"
import { useRef } from "react"
import { Cleanup } from "./Cleanup"
import { InventoryWithKeyboardShortcuts } from "../../demos/Inventory/KeyboardShortcuts"

export function UseEffect() {
  return (
    <>
      <KeyboardShortcuts />
      <ShinyTitle title="useEffect" />
      <InverseTitle>
        <h2>useEffect</h2>
        <Fragment as="li">handle stuff that's not managed by React</Fragment>
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
      <Cleanup />
    </>
  )
}
