import { InventorySlide } from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { ShinyTitle, Slide } from "../../helpers/Slide"
import { UseStateImplementation, inventoryCode } from "./UseStateImplementation"

export function UseState() {
  return (
    <>
      <ShinyTitle title="useState" />
      <InventorySlide hideSortButtons hideFilter items={[]} />
      <Slide>
        <Code highlightLines="|12,13|1,16|2|4-8|5,7|13">{inventoryCode}</Code>
      </Slide>
      <UseStateImplementation />
      {/* <Slide>
        <div style={{ display: "flex" }}>
          <ItemList
            items={items}
            setItems={() => undefined}
            isCurrent={false}
            hideSortButtons
          />
          <ItemList
            items={items}
            setItems={() => undefined}
            isCurrent={false}
            hideFilter
          />
        </div>
      </Slide>
      <Slide>
        <Code fontSize=".4em" isTwoUp highlightLines="|11|4-7,11">
          {filterItemListCode}
        </Code>
        <Code fontSize=".4em" isTwoUp highlightLines="|10,11|4-6,10,11">
          {sortItemListCode}
        </Code>
      </Slide>
      <Slide>
        <div style={{ display: "flex" }}>
          <FilterItemList items={items} />
          <SortItemList items={items} />
        </div>
      </Slide>
      <ArrayMethods /> */}
    </>
  )
}
