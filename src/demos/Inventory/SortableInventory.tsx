import { useState } from "react";
import { Item, sortFunction } from "./utils";

type Props = {
  items: Item[];
};

export function SortableInventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items);

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems([...items].sort(sortFunction(sortBy)));
  };

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

export const sortableInventoryCode = `export function Inventory({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items)

  const handleClick = (sortBy: keyof Item) => {
    setSortedItems(items.toSorted(sortFunction(sortBy)))
  }

  return (
    <>...</>
  )
}`;
