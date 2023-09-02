import {
  extractConsumeItemCode,
  memoisedConsumeItem,
  callbackisedConsumeItem,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import {
  Slide,
  Notes,
  InverseTitle,
  Fragment,
  ShinyTitle,
} from "../../helpers/Slide"
import { AddToInventorySlide } from "../4 - useMemo"
import { LinterError } from "../../helpers/LinterError"

export function UseCallback() {
  return (
    <>
      <AddToInventorySlide />
      <Slide>
        <Code highlightLines="|4">{onClickCode}</Code>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="5-9">
          {useItemCode}
        </Code>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="13-17|23-24|39">
          {extractConsumeItemCode}
        </Code>
      </Slide>

      <Slide>
        <LinterError
          ruleName="react-hooks/exhaustive-deps"
          ruleLink="https://github.com/facebook/react/issues/14920"
          code={
            <Code transparent>const consumeItem: (item: Item) =&gt; void</Code>
          }
        >
          The 'consumeItem' function makes the dependencies of useEffect Hook
          (at line 533) change on every render. Move it inside the useEffect
          callback. Alternatively, wrap the definition of 'consumeItem' in its
          own useCallback() Hook.
        </LinterError>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="13-17|35">
          {extractConsumeItemCode}
        </Code>
      </Slide>

      <Slide>
        <Code highlightLines="|2">{memoisedConsumeItem}</Code>
      </Slide>

      <ShinyTitle title="useCallback" />
      <InverseTitle>
        <h2>useCallback</h2>
        <ul>
          <Fragment as="li">
            <code>useMemo</code> for functions
          </Fragment>
        </ul>
      </InverseTitle>
      <Slide>
        <Code fontSize=".4em" highlightLines="">
          {memoisedConsumeItem}
        </Code>
        <Fragment>
          <Code fontSize=".4em" highlightLines="|2">
            {callbackisedConsumeItem}
          </Code>
        </Fragment>
      </Slide>
    </>
  )
}

const onClickCode = `<ol>
{sortedItems.map((item) => (
  <li key={item.name}>
    <button onClick={...}>
      {item.name} {item.count}
    </button>
  </li>
))}
</ol>`

const useItemCode = `useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.key.match(/^[0-9]$/)) return
    const indexToUpdate = Number.parseInt(event.key) - 1
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  }

  isCurrent && window.addEventListener("keydown", onKeyDown)

  return () => window.removeEventListener("keydown", onKeyDown)
}, [sortedItems, isCurrent])
`
