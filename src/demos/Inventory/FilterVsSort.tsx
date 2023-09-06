import { ChangeEvent, useState } from "react"
import { Item } from "./utils"
import { ListItem, sortFunction } from "./ItemList"

export function SortItemList({ items }: { items: Item[] }) {
  const [itemsToShow, setItemsToShow] = useState(items)

  const onSort = (sortBy: keyof Item) => {
    setItemsToShow(items.sort(sortFunction(sortBy)))
  }

  return (
    <>
      <button onClick={() => onSort("name")}>Sort by name</button>
      <button onClick={() => onSort("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  )
}

export function FilterItemList({ items }: { items: Item[] }) {
  const [itemsToShow, setItemsToShow] = useState(items)

  const onFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value
    setItemsToShow(items.filter((item) => item.name.includes(filter)))
  }

  return (
    <>
      <input onChange={onFilter} />
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  )
}

export const sortItemListCode = `function ItemList({ items }: Props) {
  const [itemsToShow, setItemsToShow] = useState(items)

  const onSort = (sortBy: keyof Item) => {
    setItemsToShow(items.sort(sortFunction(sortBy)))
  }

  return (
    <>
      <button onClick={() => onSort("name")}>Sort by name</button>
      <button onClick={() => onSort("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  )
}
`

export const filterItemListCode = `function ItemList({ items }: Props) {
  const [itemsToShow, setItemsToShow] = useState(items)

  const onFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value
    setItemsToShow(items.filter((item) => item.name.includes(filter)))
  }

  return (
    <>
      <input onChange={onFilter} />
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  )
}
`
