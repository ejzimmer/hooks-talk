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
        <div>useEffect</div>
        <Fragment>handle stuff that's not managed by React</Fragment>
      </InverseTitle>
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
