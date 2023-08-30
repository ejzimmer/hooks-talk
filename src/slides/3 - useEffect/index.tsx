import {
  InventoryWithoutCleanup,
  inventoryWithoutCleanupCode,
  items,
  useDodgyEventHandlers,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { Rendering } from "./Rendering"
import { KeyboardShortcuts } from "./KeyboardShortcuts"
import { useRef } from "react"

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
        <Code fontSize="0.4em" highlightLines="|4,18|5-16|17">
          {inventoryWithoutCleanupCode}
        </Code>
      </Slide>
      <Slide>
        <h2>useEffect's callback runs</h2>
        <ul>
          <Fragment as="li">
            <em>after</em> the component renders
          </Fragment>
          <Fragment as="li">whenever the dependency array changes</Fragment>
        </ul>
      </Slide>
      <WithoutCleanup />
      <WithoutCleanup showCount={true} />
      <Rendering />
    </>
  )
}

function WithoutCleanup({ showCount }: { showCount?: boolean }) {
  const withoutCleanupRef = useRef(null)
  const { addEventHandler, isCurrent } = useDodgyEventHandlers(
    withoutCleanupRef.current
  )

  return (
    <Slide ref={withoutCleanupRef}>
      <InventoryWithoutCleanup
        items={items}
        addEventHandler={addEventHandler}
        isCurrent={isCurrent}
        showCount={showCount}
      />
    </Slide>
  )
}
