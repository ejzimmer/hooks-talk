import { useEffect, useRef, useState } from "react"
import {
  Inventory,
  SlowInventory,
  inventoryCode,
  items,
  slowInventoryCode,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { Rendering } from "./Rendering"

export function UseEffect() {
  return (
    <>
      <Slide renderOnVisible={true}>
        <Inventory items={items} />
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
      <ShinyTitle title="useEffect" />
      <InverseTitle>
        <div>useEffect</div>
        <Fragment>handle stuff that's not managed by React</Fragment>
      </InverseTitle>
      <Slide>
        <Code>{inventoryCode}</Code>
        <Slide renderOnVisible={true}>
          <Inventory items={items} />
        </Slide>
      </Slide>
      <Rendering />
    </>
  )
}
