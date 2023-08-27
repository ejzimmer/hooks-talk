import {
  infiniteLoopInventoryCode,
  SortedItems,
  items,
  sortedItemsCode,
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
        <Fragment>
          <Code>{noRerenderCode}</Code>
        </Fragment>
        <Fragment>
          <Code>{betterNoRerenderCode}</Code>
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
        <h2>Only render on change</h2>
        <SortedItems items={items} />
        <Notes>more insidious because it looks like it's working</Notes>
      </Slide>

      <Slide>horrified face</Slide>

      <Slide>
        <p>
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
          and returns the reference to the same array, now sorted. The default
          sort order is ascending, built upon converting the elements into
          strings, then comparing their sequences of UTF-16 code units values.
        </p>
        <cite>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
          >
            Array.protype.sort on MDN
          </a>
        </cite>
        <Fragment>
          <ul>
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
        <code>items.sort()</code>➡️<code>[...items].sort()</code>
        <code>items.reverse()</code>➡️<code>[...items].reverse()</code>
        <code>items.push(newItem)</code>➡️<code>[...items, newItem]</code>
      </Slide>

      <Slide>
        <h2>New array methods</h2>
        <code>items.sort()</code>➡️<code>items.toSoted()</code>
        <code>items.reverse()</code>➡️<code>items.toReversed()</code>
        <code>items.push(newItem)</code>➡️<code>items.concat([newItem])</code>
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
        <SortedItems items={items} />
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

const noRerenderCode = `function CheckAllowed({ userRole, allowedRoles, children}: Props) {
  const [isAllowed, setAllowed] = useState(false)

  if (allowedRoles.includes(userRole)) {
    setIsAllowed(true)
  }

  return isAllowed ? children : <NotAllowed />
}`
const betterNoRerenderCode = `function CheckAllowed({ userRole, allowedRoles, children}: Props) {
  return allowedRoles.includes(userRole) ? children : <NotAllowed />
}`
