import { useState } from "react";
import { InventorySlide } from "../../demos/Inventory";
import { Code } from "../../helpers/Code";
import { Fragment, Slide } from "../../helpers/Slide";
import { ItemList } from "../../demos/Inventory/ItemList";
import { Item } from "../../demos/Inventory/utils";

const useStateImplementationCode = `const MyReact = () => {
  let currentIndex = 0
  let startState = [] as any[]
  let endState = [] as any[]

  function after() {
    currentIndex = 0

    const needsChange = startState.some(
      (item, index) => item !== endState[index]
    )

    startState = endState
    endState = []

    if (needsChange) {
      render()
    }
  }

  return {
    //...useEffect...,
    useState(initialValue: any) {
      if (typeof oldState[currentIndex] === "undefined") {
        startState[currentIndex] = initialValue
        endState[currentIndex] = initialValue
      }

      const value = startState[currentIndex]
      const setterIndex = currentIndex
      const setter = (newValue: any) => {
        endState[setterIndex] = newValue
      }

      currentIndex = currentIndex + 1
      return [value, setter]
    },
  }
}

`;

export const inventoryCode = `function Inventory() {
  const [inventory, setInventory] = useState([])

  const addItem = (name?: string, count?: string) => {
    setInventory(
      addItemToInventory(inventory, name, count)
    )
  }

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <ItemList items={inventory} />
    </>
  )
}
`;

function ReactCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string;
  isBackground?: boolean;
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      isTwoUp
      isBackground={isBackground}
    >
      {useStateImplementationCode}
    </Code>
  );
}

function ComponentCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string;
  isBackground?: boolean;
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      isTwoUp
      isBackground={isBackground}
    >
      {inventoryCode}
    </Code>
  );
}

function StateArray({
  currentIndex = 0,
  oldValue,
  newValue,
  pointers = ["", ""],
  value,
  setter,
  addItem,
  needsChange,
}: {
  currentIndex?: number;
  oldValue?: string;
  newValue?: string;
  pointers?: ("⬇️" | "⬆️" | "")[];
  value?: "value" | "inventory";
  setter?: "setter" | "setInventory";
  addItem?: "addItem";
  needsChange?: "false" | "true";
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>currentIndex</code>➡️<code>{currentIndex}</code>
      </div>
      {value && <code>{value} ⬇️</code>}
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>startState</code>➡️
        <code style={{ display: "flex" }}>[{pointers[0]}]</code>
      </div>
      <div>{oldValue}</div>
      <div
        style={{
          display: "flex",
          gap: ".25em",
          alignItems: "center",
          position: "relative",
        }}
      >
        <code>endState</code>➡️
        <code style={{ display: "flex" }}>
          [{pointers[1]}]
          <div
            style={{
              position: "absolute",
              fontSize: ".5em",
              top: "5px",
              right: "10px",
            }}
          >
            {(setter || addItem) && "🔑"}
          </div>
        </code>
      </div>
      <div>{newValue}</div>
      {setter && <code>{setter} 🔑</code>}
      {addItem && <code>{addItem} 🔑</code>}
      {needsChange && <code>needsChange: {needsChange}</code>}
    </div>
  );
}

export function UseStateImplementation() {
  return (
    <>
      <Slide data-transition="none-out">
        <Fragment index={2} className="fade custom">
          <ReactCode />
        </Fragment>
        <Fragment index={1} className="fade custom">
          <ComponentCode />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="2-4" />
        <ComponentCode isBackground />
        <StateArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,2,16" />
        <StateArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="24,27|25,26" />
        <ComponentCode highlightLines="2" />
        <StateArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="24,27|25,26" />
        <ComponentCode highlightLines="2" />
        <StateArray oldValue="[]" pointers={["⬇️", "⬆️"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="29|30-33" />
        <ComponentCode highlightLines="2" />
        <StateArray oldValue="[]" pointers={["⬇️", "⬆️"]} value="value" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="30-33|35" />
        <ComponentCode highlightLines="2" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          value="value"
          setter="setter"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="35" />
        <ComponentCode highlightLines="2" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          value="value"
          setter="setter"
          currentIndex={1}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="36" />
        <ComponentCode highlightLines="2" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          value="value"
          setter="setter"
          currentIndex={1}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="2|4-8" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          value="inventory"
          setter="setInventory"
          currentIndex={1}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="2|4-8" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          value="inventory"
          setter="setInventory"
          currentIndex={1}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="4-8|10-15" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          value="inventory"
          setter="setInventory"
          currentIndex={1}
          addItem="addItem"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="6,19|7" />
        <ComponentCode isBackground />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          currentIndex={1}
          addItem="addItem"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="7|9-11" />
        <ComponentCode isBackground />
        <StateArray oldValue="[]" pointers={["⬇️", "⬆️"]} addItem="addItem" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="9-11|13,14" />
        <ComponentCode isBackground />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬆️"]}
          addItem="addItem"
          needsChange="false"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13,14|16,18" />
        <ComponentCode isBackground />
        <StateArray
          oldValue="[]"
          pointers={["⬇️"]}
          addItem="addItem"
          needsChange="false"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode isBackground />
        <StateArray oldValue="[]" pointers={["⬇️"]} addItem="addItem" />
      </Slide>

      {/* add an item */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="4-8" />
        <StateArray oldValue="[]" pointers={["⬇️"]} addItem="addItem" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="4-8" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬇️"]}
          addItem="addItem"
          newValue="[🍎]"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="6,7,19|9-11" />
        <ComponentCode highlightLines="4-8" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬇️"]}
          addItem="addItem"
          newValue="[🍎]"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="9-11|13,14" />
        <ComponentCode highlightLines="4-8" />
        <StateArray
          oldValue="[]"
          pointers={["⬇️", "⬇️"]}
          addItem="addItem"
          newValue="[🍎]"
          needsChange="true"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13,14|16-18" />
        <ComponentCode highlightLines="4-8" />
        <StateArray
          oldValue="[🍎]"
          pointers={["⬇️", "⬇️"]}
          addItem="addItem"
          newValue="[]"
          needsChange="true"
        />
      </Slide>
      <InventorySlide
        hideSortButtons
        hideFilter
        items={[{ name: "apple", count: 1 }]}
      />
      <Slide>the state values always points to the original value</Slide>
      <Slide>
        <Code highlightLines="">{unlikelyComponentCode}</Code>
      </Slide>
      <Slide>
        <UnlikelyComponent />
      </Slide>
      <Slide data-transition="none-out">
        <Code highlightLines="">{unlikelyComponentCode}</Code>
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="2">{unlikelyComponentCode}</Code>
        <StateArray oldValue="[flint]" pointers={["⬇️", "⬇️"]} newValue="[]" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="5">{unlikelyComponentCode}</Code>
        <StateArray oldValue="[flint]" pointers={["⬇️", "⬇️"]} newValue="[]" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="5">{unlikelyComponentCode}</Code>
        <StateArray
          oldValue="[flint]"
          pointers={["⬇️", "⬇️"]}
          newValue="[flint, apple]"
        />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="6">{unlikelyComponentCode}</Code>
        <StateArray
          oldValue="[flint]"
          pointers={["⬇️", "⬇️"]}
          newValue="[flint, apple]"
        />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="6">{unlikelyComponentCode}</Code>
        <StateArray
          oldValue="[flint]"
          pointers={["⬇️", "⬇️"]}
          newValue="[flint, pinecone]"
        />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="7">{unlikelyComponentCode}</Code>
        <StateArray
          oldValue="[flint]"
          pointers={["⬇️", "⬇️"]}
          newValue="[flint, pinecone]"
        />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="7">{unlikelyComponentCode}</Code>
        <StateArray
          oldValue="[flint]"
          pointers={["⬇️", "⬇️"]}
          newValue="[flint, chu jelly]"
        />
      </Slide>
    </>
  );
}

function UnlikelyComponent() {
  const [items, setItems] = useState<Item[]>([{ name: "flint", count: 1 }]);

  const addItems = () => {
    setItems([...items, { name: "appple", count: 1 }]);
    setItems([...items, { name: "pinecone", count: 1 }]);
    setItems([...items, { name: "chu jelly", count: 1 }]);
  };

  return (
    <>
      <button onClick={addItems}>Add items</button>
      <ItemList
        hideFilter
        hideSortButtons
        items={items}
        setItems={() => undefined}
        isCurrent={false}
      />
    </>
  );
}

const unlikelyComponentCode = `function UnlikelyComponent() {
  const [items, setItems] = useState(['flint']);

  const addItems = () => {
    setItems([...items, "apple"]);
    setItems([...items, "pinecone"]);
    setItems([...items, "chu jelly"]);
  };

  return (
    <>
      <button onClick={addItems}>Add items</button>
      <ItemList items={items} />
    </>
  );
}
`;
