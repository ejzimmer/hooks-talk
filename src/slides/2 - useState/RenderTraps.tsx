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
          <Code fontSize="0.4em" highlightLines="4-8">
            {disappearingErrorMessageCode}
          </Code>
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

      <Slide>
        <h2>Only render on change</h2>
        <Code fontSize="0.45em" highlightLines="|10-15|4-6">
          {brokenSortedItemsCode}
        </Code>
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
          <cite className="footnote">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
            >
              Array.protype.sort on MDN
            </a>
          </cite>
        </blockquote>
        <Notes>these are called Mutating methods</Notes>
      </Slide>
      <Slide>
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
      </Slide>

      <Slide>
        <h2>Make a copy</h2>
        <ul>
          <Fragment as="li">
            <code>items.sort()</code> ➡️ <code>[...items].sort()</code>
          </Fragment>
          <Fragment as="li">
            <code>items.reverse()</code> ➡️ <code>[...items].reverse()</code>
          </Fragment>
          <Fragment as="li">
            <code>items.push(newItem)</code> ➡️ <br />
            <code>[...items, newItem]</code>
          </Fragment>
        </ul>
      </Slide>

      <Slide>
        <h2>New array methods</h2>
        <ul>
          <Fragment as="li">
            <code>items.sort()</code> ➡️ <code>items.toSorted()</code>
          </Fragment>
          <Fragment as="li">
            <code>items.reverse()</code> ➡️ <code>items.toReversed()</code>
          </Fragment>
          <Fragment as="li">
            <code>items.push(newItem)</code> ➡️{" "}
            <code>items.concat([newItem])</code>
          </Fragment>
        </ul>
        <cite className="footnote">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods"
          >
            Full list of replacement methods on MDN
          </a>
        </cite>
      </Slide>

      <Slide>
        <Code highlightLines="|5">{sortedItemsCode}</Code>
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
