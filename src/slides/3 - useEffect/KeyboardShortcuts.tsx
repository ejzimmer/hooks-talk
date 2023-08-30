import {
  items,
  slowInventoryCode,
  BrokenInventory,
  Inventory,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"

export function KeyboardShortcuts() {
  return (
    <>
      <Slide>
        <Inventory items={items} />
      </Slide>
      <Slide>
        <Code fontSize=".5em" highlightLines="8-19|8|9|11|12-18">
          {slowInventoryCode}
        </Code>
      </Slide>
      <Slide renderOnVisible={true}>
        <BrokenInventory items={items} />
      </Slide>
      <Slide>
        <Code fontSize=".5em" highlightLines="8-19">
          {slowInventoryCode}
        </Code>
      </Slide>
    </>
  )
}
