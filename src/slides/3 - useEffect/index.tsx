import { Inventory, items, slowInventoryCode } from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"

export function UseEffect() {
  return (
    <>
      <Slide>
        <Inventory items={items} />
      </Slide>
      <Slide>
        <Code>{slowInventoryCode}</Code>
      </Slide>
    </>
  )
}
