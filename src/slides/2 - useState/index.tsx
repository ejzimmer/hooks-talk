import { InventorySlide } from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { UseStateImplementation, inventoryCode } from "./UseStateImplementation"

export function UseState() {
  return (
    <>
      <InventorySlide hideSortButtons hideFilter items={[]} />
      <ShinyTitle title="useState" />
      <Slide>
        <Code highlightLines="|2|4-8|5-7|12|13">{inventoryCode}</Code>
      </Slide>
      <UseStateImplementation />
      <InverseTitle>
        <h2>useState</h2>
        <ul>
          <li>Stores state in an array in a closure</li>
          <li>
            Re-renders the component<br></br> when the state changes
          </li>
        </ul>
      </InverseTitle>
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
