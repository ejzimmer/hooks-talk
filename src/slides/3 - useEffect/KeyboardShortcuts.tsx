import {
  InventoryWithoutCleanup,
  items,
  slowInventoryCode,
  SlowInventory,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"

export function KeyboardShortcuts() {
  return (
    <>
      <Slide renderOnVisible={true}>
        <InventoryWithoutCleanup items={items} />
      </Slide>
      <Slide>
        <Code>{slowInventoryCode}</Code>
      </Slide>
      <Slide renderOnVisible={true}>
        <SlowInventory items={items} />
      </Slide>
      <Slide>
        <Code>{slowInventoryCode}</Code>
      </Slide>
    </>
  )
}
