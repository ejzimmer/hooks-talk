import { useRef } from "react"
import {
  useDodgyEventHandlers,
  items,
  InventorySlide,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"
import {
  InventoryWithoutCleanup,
  InventoryWithoutCleanupOrDependency,
} from "../../demos/Inventory/WithoutCleanup"
import { LinterError } from "../../helpers/LinterError"

export function Cleanup() {
  return (
    <>
      <Slide>
        <Code fontSize="0.4em" highlightLines="|4,18|5-16|17">
          {inventoryWithoutCleanupCode}
        </Code>
      </Slide>
      <Slide>
        <h2>useEffect's callback runs</h2>
        <ul>
          <Fragment as="li">
            <em>after</em> the component renders
          </Fragment>
          <Fragment as="li">whenever the dependency array changes</Fragment>
        </ul>
      </Slide>
      <WithoutCleanup />
      <WithoutCleanup showCount={true} />

      <Slide>
        <Code fontSize="0.4em">{inventoryWithoutCleanupCode}</Code>
      </Slide>
      <Slide>
        <Code fontSize="0.4em">
          {inventoryWithoutCleanupWithoutDependencyCode}
        </Code>
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
        <Code fontSize="0.4em">{inventoryWithoutCleanupCode}</Code>
        <Notes>
          we need some way to tell useEffect to ditch the old event handler and
          add a new one with the new sortedItems array every time sortedItems
          changes
        </Notes>
      </Slide>

      <Slide>
        <Code>window.removeEventListener("keydown", onKeyDown)</Code>
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

export const inventoryWithoutCleanupCode = `export function Inventory({ items }: Props) {
  ...

  useEffect(
    () => {
      window.addEventListener("keydown", (event) => {
        if (!event.key.match(/^[0-9]$/)) return

        const indexToUpdate = Number.parseInt(event.key)
        setSortedItems(
          sortedItems.map((item, index) =>
            index === indexToUpdate ? { ...item, count: --item.count } : item
          )
        )
      })
    }, 
    [sortedItems]
  )

  return (...)
}
`

function WithoutCleanup({ showCount }: { showCount?: boolean }) {
  const withoutCleanupRef = useRef(null)
  const { addEventHandler, isCurrent } = useDodgyEventHandlers(
    withoutCleanupRef.current
  )

  return (
    <Slide ref={withoutCleanupRef}>
      <InventoryWithoutCleanup
        items={items}
        addEventHandler={addEventHandler}
        isCurrent={isCurrent}
        showCount={showCount}
      />
    </Slide>
  )
}

export const inventoryWithoutCleanupWithoutDependencyCode = `export function Inventory({ items }: Props) {
  ...

  useEffect(
    () => {
      window.addEventListener("keydown", (event) => {
        if (!event.key.match(/^[0-9]$/)) return

        const indexToUpdate = Number.parseInt(event.key)
        setSortedItems(
          sortedItems.map((item, index) =>
            index === indexToUpdate ? { ...item, count: --item.count } : item
          )
        )
      })
    }, 
    []
  )

  return (...)
}
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

const useEffectCleanupCode = `useEffect(() => {
  // do some stuff

  return () => {
    // do some cleanup
  }
}, [dependencies])
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
