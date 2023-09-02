import { Code } from "../../../helpers/Code"
import { Notes, Slide } from "../../../helpers/Slide"

export function InfiniteRenderLoop() {
  return (
    <>
      <Slide>
        <h2>Only render on change</h2>
        <Code highlightLines="|2|4-8" fontSize="0.5em">
          {infiniteLoopInventoryCode}
        </Code>
      </Slide>
      <Slide>
        <img
          alt="too many renders error message"
          src="./too-many-renders.png"
        />
        <Notes>
          we'll talk about how to deal with this one later, but it's also not
          likely to cause any real problems, because it's very easy to catch -
          component literally won't render & you'll see any error message (in
          dev)
        </Notes>
      </Slide>
    </>
  )
}

export const infiniteLoopInventoryCode = `export function FilteredItems({ items, filterType }: Props) {
  const [filteredItems, setFilteredItems] = useState(items)

  setFilteredItems(
    items.filter((item) => item.type === filterType)
  )

  return (
    <ul>
      {filteredItems.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  )
}`
