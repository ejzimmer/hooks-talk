import {
  InventoryWithSort,
  inventoryWithSortCode,
  items,
} from "../../../demos/Inventory/"
import {
  InventoryWithBrokenSort,
  brokenSortedItemsCode,
} from "../../../demos/Inventory/BrokenSort"
import { Code } from "../../../helpers/Code"
import { Fragment, Notes, Slide } from "../../../helpers/Slide"

export function ArrayMethods() {
  return (
    <>
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

      <ArraySortDocs />
      <MutatingMethods />
      <ArrayCopyTrick />
      <NewArrayMethods />

      <Slide>
        <Code highlightLines="|5">{inventoryWithSortCode}</Code>
        <InventoryWithSort items={items} />
      </Slide>
    </>
  )
}

function ArraySortDocs() {
  return (
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
  )
}

function MutatingMethods() {
  return (
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
  )
}

function ArrayCopyTrick() {
  return (
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
  )
}

function NewArrayMethods() {
  return (
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
  )
}
