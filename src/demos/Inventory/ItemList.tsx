import { useCallback, useEffect, useMemo, useState } from "react";
import { Item } from "./utils";

export function sortFunction(by: keyof Item) {
  return (a: Item, b: Item) => (a[by] === b[by] ? 0 : a[by] < b[by] ? -1 : 1);
}

export type Props = {
  items: Item[];
  setItems: (items: Item[]) => void;
  isCurrent: boolean;
  hideSortButtons?: boolean;
  hideFilter?: boolean;
};

export function ItemList({
  items,
  setItems,
  isCurrent,
  hideSortButtons,
  hideFilter,
}: Props) {
  const [sortBy, setSortBy] = useState<keyof Item | undefined>();
  const [filter, setFilter] = useState("");

  const itemsToShow = useMemo(() => {
    const filteredItems = filter
      ? items.filter((item) => item.name.includes(filter))
      : [...items];
    return sortBy ? filteredItems.sort(sortFunction(sortBy)) : filteredItems;
  }, [filter, items, sortBy]);

  const consumeItem = useCallback(
    (item: Item) => {
      setItems(items.map((i) => (i === item ? { ...i, count: --i.count } : i)));
    },
    [items, setItems]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = itemsToShow[indexToUpdate];
      consumeItem(itemToUpdate);
    };

    isCurrent && window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemsToShow, consumeItem, isCurrent]);

  return (
    <>
      {!hideFilter && (
        <input onChange={(event) => setFilter(event.target.value)} />
      )}
      {!hideSortButtons && (
        <>
          <button onClick={() => setSortBy("name")}>Sort by name</button>
          <button onClick={() => setSortBy("count")}>Sort by count</button>
        </>
      )}
      <ol>
        {itemsToShow.map((item) => (
          <ListItem
            key={item.name}
            onClick={() => consumeItem(item)}
            item={item}
          />
        ))}
      </ol>
    </>
  );
}

export function ListItem({
  item,
  onClick,
}: {
  item: Item;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        style={{
          background: "none",
          padding: "0",
          border: "none",
          lineHeight: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        {item.name} {item.count}
      </button>
    </li>
  );
}

export function ItemListWithTooMuchState({ items, isCurrent }: Props) {
  const [itemsToShow, setItemsToShow] = useState<Item[]>(items);

  const handleSort = (sortBy: keyof Item) => {
    setItemsToShow([...itemsToShow].sort(sortFunction(sortBy)));
  };
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsToShow(
      items.filter((item) => item.name.includes(event.target.value))
    );
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = itemsToShow[indexToUpdate];
      setItemsToShow(
        items.map((i) => (i === itemToUpdate ? { ...i, count: --i.count } : i))
      );
    };

    isCurrent && window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemsToShow, items, isCurrent]);

  return (
    <>
      <input onChange={handleFilter} />
      <button onClick={() => handleSort("name")}>Sort by name</button>
      <button onClick={() => handleSort("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  );
}

export function ItemListWithTooMuchEffect({ items, isCurrent }: Props) {
  const [itemsToShow, setItemsToShow] = useState<Item[]>(items);
  const [sortBy, setSortBy] = useState<keyof Item>();
  const [filterBy, setFilterBy] = useState<string>();

  useEffect(() => {
    const sortedItems = sortBy ? items.sort(sortFunction(sortBy)) : items;
    const filteredItems = filterBy
      ? sortedItems.filter((item) => item.name.includes(filterBy))
      : sortedItems;
    setItemsToShow(filteredItems);
  }, [items, sortBy, filterBy]);

  const handleSort = (sortBy: keyof Item) => {
    setSortBy(sortBy);
  };
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(event.target.value);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = itemsToShow[indexToUpdate];
      setItemsToShow(
        items.map((i) => (i === itemToUpdate ? { ...i, count: --i.count } : i))
      );
    };

    isCurrent && window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemsToShow, items, isCurrent]);

  return (
    <>
      <input onChange={handleFilter} />
      <button onClick={() => handleSort("name")}>Sort by name</button>
      <button onClick={() => handleSort("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  );
}
