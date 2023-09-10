import { useRef, useState } from "react";
import { InventorySlide } from "../../demos/Inventory";
import { Code } from "../../helpers/Code";
import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide";
import {
  UseStateImplementation,
  inventoryCode,
} from "./UseStateImplementation";
import { Item, addItemToInventory, items } from "../../demos/Inventory/utils";
import { AddItemForm } from "../../demos/Inventory/AddItemForm";
import { ItemList } from "../../demos/Inventory/ItemList";
import { FunctionalComponentProblems } from "../0 - intro/FunctionalComponentsProblems";
import {
  FilterItemList,
  SortItemList,
  filterItemListCode,
  sortItemListCode,
} from "../../demos/Inventory/FilterVsSort";
import { ArrayMethods } from "./ArrayMethods";

export function UseState() {
  const [, setRender] = useState(false);
  return (
    <>
      <InventorySlide hideSortButtons hideFilter items={[]} />
      <Slide>
        <Code highlightLines="|8-14|2|4-7">{addItemUsingRefCode}</Code>
      </Slide>
      <Slide>
        <button onClick={() => setRender((render) => !render)}>
          Render parent
        </button>
        <AddItemsUsingRef />
      </Slide>
      <FunctionalComponentProblems />
      <ShinyTitle title="useState" />
      <InverseTitle>
        <h2>useState</h2>
        <ul>
          <Fragment as="li">maintain data between renders</Fragment>
          <Fragment as="li">trigger render when that data changes</Fragment>
        </ul>
      </InverseTitle>
      <Slide>
        <Code highlightLines="|2|4-8|5,7|13">{inventoryCode}</Code>
      </Slide>
      <UseStateImplementation />
      <Slide>
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
        <Code fontSize=".4em" isTwoUp>
          {filterItemListCode}
        </Code>
        <Code fontSize=".4em" isTwoUp>
          {sortItemListCode}
        </Code>
      </Slide>
      <Slide>
        <div style={{ display: "flex" }}>
          <FilterItemList items={items} />
          <SortItemList items={items} />
        </div>
      </Slide>
      <ArrayMethods />

      <Slide>
        <h2>useState</h2>
        <ul>
          <li>store states between renders</li>
          <li>causes a re-render when updated</li>
          <li>watch out for mutating array methods!</li>
        </ul>
      </Slide>
    </>
  );
}

const addItemUsingRefCode = `function Inventory() {
  const inventory = useRef<Item[]>([])

  const addItem = (name?: string, count?: string) => {
    inventory.current = 
      addItemToInventory(inventory, name, count)
  }

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <ItemList items={inventory.current} />
    </>
  )
}
`;

function AddItemsUsingRef() {
  const inventory = useRef<Item[]>([]);

  const addItem = (name: string, count: string) => {
    if (!inventory.current) return;
    inventory.current = addItemToInventory(inventory.current, name, count);
  };

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <ItemList
        items={inventory.current}
        setItems={() => undefined}
        isCurrent={false}
        hideSortButtons
        hideFilter
      />
    </>
  );
}
