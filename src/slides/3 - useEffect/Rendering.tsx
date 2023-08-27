import { Code } from "../../helpers/Code"
import { Notes, Slide } from "../../helpers/Slide"
import { Inventory, items } from "../../demos/Inventory"

export function Rendering() {
  return (
    <>
      <Slide>
        <h2>useEffect's callback runs</h2>
        <ul>
          <li>
            <em>after</em> the component renders
          </li>
          <li>whenever the dependency array changes</li>
        </ul>
      </Slide>

      <Slide>
        <Code>{useEffectCode}</Code>
        <Notes>
          all variables used by useEffect should be included in the dependency
          array, else things won't work properly. eg our useEffect would have
          the array sorted incorrectly
        </Notes>
      </Slide>

      <Slide>
        React Hook useEffect has a missing dependency: 'sortedItems'. Either
        include it or remove the dependency array. You can also do a functional
        update 'setSortedItems(s =&gt; ...)' if you only need 'sortedItems' in
        the 'setSortedItems' call.eslintreact-hooks/exhaustive-deps
        <Notes>use a linter!</Notes>
      </Slide>

      <Slide renderOnVisible={true}>
        <Inventory items={items} />
      </Slide>
    </>
  )
}

const useEffectCode = `useEffect(() => {
  window.addEventListener("keydown", (event) => {
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key)
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  })
}, [sortedItems])
`
