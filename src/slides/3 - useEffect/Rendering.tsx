import { Code } from "../../helpers/Code"
import { Notes, Slide } from "../../helpers/Slide"
import {
  InventorySlide,
  InventoryWithoutCleanupOrDependency,
  items,
  useDodgyEventHandlers,
} from "../../demos/Inventory"
import { useRef } from "react"
import { LinterError } from "../../helpers/LinterError"

export function Rendering() {
  return (
    <>
      <Slide>
        <Code fontSize="0.4em">{useEffectCode}</Code>
      </Slide>
      <Slide>
        <Code fontSize="0.4em">{useEffectWithoutDependencyCode}</Code>
      </Slide>
      <Slide>
        <LinterError
          ruleName="react-hooks/exhaustive-deps"
          ruleLink="https://github.com/facebook/react/issues/14920"
          code={
            <>
              (parameter) isCurrent: boolean{" "}
              <span style={{ color: "#f92672" }}>|</span>{" "}
              <span style={{ color: "#ab6ec3" }}>undefined</span>
            </>
          }
        >
          React Hook useEffect has a missing dependency: 'sortedItems'. Either
          include it or remove the dependency array. You can also do a
          functional update 'setSortedItems(s =&gt; ...)' if you only need
          'sortedItems' in the 'setSortedItems' call.
        </LinterError>
      </Slide>
      <WithoutDependency />

      <Slide>
        <Code fontSize="0.4em">{useEffectCode}</Code>
        <Notes>
          we need some way to tell useEffect to ditch the old event handler and
          add a new one with the new sortedItems array every time sortedItems
          changes
        </Notes>
      </Slide>

      <Slide>
        <Code fontSize=".4em" highlightLines="|1-9|13|17">
          {removeEventListenerCode}
        </Code>
      </Slide>
      <Slide>
        <Code>{useEffectCleanupCode}</Code>
      </Slide>
      <Slide>
        <Code fontSize="0.4em" highlightLines="|15">
          {useEffectWithCleanupCode}
        </Code>
      </Slide>

      <InventorySlide />
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

const useEffectWithoutDependencyCode = `useEffect(() => {
  window.addEventListener("keydown", (event) => {
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key)
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  })
}, [])
`

const useEffectWithCleanupCode = `useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.key.match(/^[0-9]$/)) return

    const indexToUpdate = Number.parseInt(event.key)
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  }

  window.addEventListener("keydown", onKeyDown)

  return () => window.removeEventListener("keydown", onKeyDown)
}, [sortedItems])
`

function WithoutDependency() {
  const withoutDependencyRef = useRef(null)
  const { addEventHandler, isCurrent } = useDodgyEventHandlers(
    withoutDependencyRef.current
  )

  return (
    <Slide ref={withoutDependencyRef}>
      <InventoryWithoutCleanupOrDependency
        items={items}
        addEventHandler={addEventHandler}
        isCurrent={isCurrent}
      />
    </Slide>
  )
}

const removeEventListenerCode = `const onKeyDown = (event: KeyboardEvent) => {
  if (!event.key.match(/^[0-9]$/)) return
  const indexToUpdate = Number.parseInt(event.key) - 1
  setSortedItems(
    sortedItems.map((item, index) =>
      index === indexToUpdate ? { ...item, count: --item.count } : item
    )
  )
}

...

window.addEventListener("keydown", onKeyDown)

...

window.removeEventListener("keydown", onKeyDown)
`

const useEffectCleanupCode = `useEffect(() => {
  // do some stuff

  return () => {
    // do some cleanup
  }
}, [dependencies])
`
