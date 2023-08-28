import {
  AcceptTermsWithDisappearingErrorMessages,
  disappearingErrorMessageCode,
  onSubmit,
} from "../../demos/AcceptTerms"
import {
  infiniteLoopInventoryCode,
  InventoryWithBrokenSort,
  items,
  sortedItemsCode,
  brokenSortedItemsCode,
  InventoryWithSort,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Slide, Notes, Fragment } from "../../helpers/Slide"

export function RenderTraps() {
  return (
    <>
      <Slide>
        <ul>
          <Fragment as="li">One render per task</Fragment>
          <Fragment as="li">Only render on change</Fragment>
        </ul>
      </Slide>

      <Slide>
        <h2>One render per task</h2>
        <Code>{multipleUseStatesCode}</Code>
        <Notes>
          almost never comes up, but nice to know it works, in case it does
        </Notes>
      </Slide>

      <Slide>
        <h2>Only render on change</h2>
        <AcceptTermsWithDisappearingErrorMessages onSubmit={onSubmit} />
        <Fragment>
          <Code fontSize="0.4em">{disappearingErrorMessageCode}</Code>
        </Fragment>
        <Notes>
          <ul>
            <li>far more likely to cause a problem</li>
            <li>
              first version is ok, won't cause a problem but would be better
              without state
            </li>
          </ul>
        </Notes>
      </Slide>

      <Slide>
        <h2>Only render on change</h2>
        <Code>{infiniteLoopInventoryCode}</Code>
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

      <Slide>
        <Code fontSize="0.45em">{brokenSortedItemsCode}</Code>
      </Slide>

      <Slide>
        <h2>Only render on change</h2>
        <InventoryWithBrokenSort items={items} />
        <Notes>more insidious because it looks like it's working</Notes>
      </Slide>

      <Slide>horrified face</Slide>

      <Slide>
        <blockquote>
          The <code>sort()</code> method of{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
          >
            <code>Array</code>
          </a>{" "}
          instances sorts the elements of an array{" "}
          <em>
            <a
              href="https://en.wikipedia.org/wiki/In-place_algorithm"
              target="_blank"
              rel="noreferrer"
            >
              in place
            </a>
          </em>{" "}
          and returns the reference to the same array, now sorted.
          <cite style={{ display: "block" }}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
            >
              Array.protype.sort on MDN
            </a>
          </cite>
        </blockquote>
        <Fragment>
          <ul style={{ columnCount: 2 }}>
            <li>copyWithin()</li>
            <li>fill()</li>
            <li>pop()</li>
            <li>push(v1, v2)</li>
            <li>reverse()</li>
            <li>shift()</li>
            <li>sort()</li>
            <li>splice()</li>
            <li>unshift(v1, v2)</li>
          </ul>
        </Fragment>
        <Notes>these are called Mutating methods</Notes>
      </Slide>

      <Slide>
        <h2>Make a copy</h2>
        <ul>
          <li>
            <code>items.sort()</code> ➡️ <code>[...items].sort()</code>
          </li>
          <li>
            <code>items.reverse()</code> ➡️ <code>[...items].reverse()</code>
          </li>
          <li>
            <code>items.push(newItem)</code> ➡️ <code>[...items, newItem]</code>
          </li>
        </ul>
      </Slide>

      <Slide>
        <h2>New array methods</h2>
        <ul>
          <li>
            <code>items.sort()</code> ➡️ <code>items.toSorted()</code>
          </li>
          <li>
            <code>items.reverse()</code> ➡️ <code>items.toReversed()</code>
          </li>
          <li>
            <code>items.push(newItem)</code> ➡️{" "}
            <code>items.concat([newItem])</code>
          </li>
        </ul>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods"
        >
          Full list of replacement methods on MDN
        </a>
      </Slide>

      <Slide>
        <Code>{sortedItemsCode}</Code>
        <InventoryWithSort items={items} />
      </Slide>
    </>
  )
}

const multipleUseStatesCode = `onClick = () => {
  setAllowed(true) // default to allow

  if (actuallyNotAllowed(user)) {
    setAllowed(false)
  }
}
`
