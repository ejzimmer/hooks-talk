import { useRef, useState } from "react";
import { Item, Props, items, sortFunction } from "./utils";
import { useDodgyEventHandlers } from ".";
import { Slide } from "../../helpers/Slide";

export function WithoutUseEffectSlide() {
  const slideRef = useRef(null);
  const { isCurrent, addEventHandler } = useDodgyEventHandlers(
    slideRef.current
  );

  return (
    <Slide ref={slideRef}>
      <WithoutUseEffect
        items={items}
        addEventHandler={addEventHandler}
        isCurrent={isCurrent}
      />
    </Slide>
  );
}

function WithoutUseEffect({ items, addEventHandler, isCurrent }: Props) {
  const [sortedItems, setSortedItems] = useState(items);

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...sortedItems].sort(sortFunction(sortBy)));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    console.log("keydown handler called");
    if (!event.key.match(/^[0-9]$/)) return;

    const indexToUpdate = Number.parseInt(event.key) - 1;
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    );
  };

  if (isCurrent) {
    addEventHandler && addEventHandler(onKeyDown);
    window.addEventListener("keydown", onKeyDown);
  }

  return (
    <>
      <button onClick={() => handleClick("name")}>Sort by name</button>
      <button onClick={() => handleClick("count")}>Sort by count</button>
      <ol>
        {sortedItems.map((item) => (
          <li key={item.name}>
            {item.name} {item.count}
          </li>
        ))}
      </ol>
    </>
  );
}

export const withoutUseEffectCode = `export function Inventory({ items }: Props) {
  const [itemsToShow, setItemsToShow] = useState(items)

  ...sort & filter code...

  window.addEventListener("keydown", (event) => {
    if (!event.key.match(/^[1-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key) - 1
    setItemsToShow(
      itemsToShow.map((item, index) =>
        index === indexToUpdate ? 
          { ...item, count: --item.count } : 
          item
      )
    )
  })

  return (...)
}
`;
