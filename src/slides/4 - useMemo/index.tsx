import {
  AddToInventory,
  AddToInventoryNotWorking,
  callbackisedConsumeItem,
  extractConsumeItemCode,
  inventoryCode,
  inventoryWithUseEffectCode,
  memoisedConsumeItem,
  updateableInventoryCode,
} from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import {
  Fragment,
  InverseTitle,
  Notes,
  ShinyTitle,
  Slide,
} from "../../helpers/Slide"

export function UseMemo() {
  return (
    <>
      <Slide renderOnVisible={true}>
        <AddToInventoryNotWorking />
      </Slide>
      <Slide>
        <Code>{inventoryCode}</Code>
        <Notes>
          it doesn't work becuase right at the start of the component we set the
          state from the props and then just use the state
        </Notes>
      </Slide>
      <Slide>
        <Code>{inventoryWithUseEffectCode}</Code>
        <Notes>
          <p>
            we might be tempted to do somthing like this, but it breaks the
            sorting, and it's not really how useEffect is intended to work
          </p>
        </Notes>
      </Slide>
      <Slide>
        <blockquote>
          Effects are an escape hatch from the React paradigm.
        </blockquote>
        <cite>
          <a
            href="https://react.dev/learn/you-might-not-need-an-effect"
            target="_blank"
            rel="noreferrer"
          >
            React docs
          </a>
        </cite>
        <Notes>
          <p>
            we tend to think of useEffect as a mechanism to watch for changes,
            but that's not really what it is. the whole of react is a mechanism
            to watch for changes. useEffect is for dealing with things outside
            the control of react
          </p>
          <p>
            if your effect is happening due to a user interaction, use an event
            handler
          </p>
          <p>
            if your effect is transforming data for rendering - like we're doing
            here - we don't even need anything
          </p>
        </Notes>
      </Slide>
      <Slide>
        <Code>{updateableInventoryCode}</Code>
      </Slide>
      <Slide renderOnVisible={true}>
        <AddToInventory />
      </Slide>
      <Slide>
        <h2>But what if my calculation is really expensive?</h2>
      </Slide>
      <ShinyTitle title="useMemo" />
      <InverseTitle>
        <div>useMemo</div>
        <Fragment>memoise a value</Fragment>
        <Fragment>ie only recalculate if it changes</Fragment>
      </InverseTitle>
      <Slide>
        <Code>{unmemoisedCode}</Code>
        <Fragment>
          <Code>{memoisedCode}</Code>
        </Fragment>
      </Slide>
      <Slide>
        <h2>useMemo</h2>
        <ul>
          <li>calculates a value</li>
          <li>only recalculates the value if the dependencies change</li>
        </ul>
      </Slide>

      <InverseTitle>useCallback</InverseTitle>

      <Slide>
        <Code>{extractConsumeItemCode}</Code>
        <Notes>
          <p>sometimes we need to pass a callback into a dependency array</p>
          <p>
            extracted consume item code out so we could use it in an onclick as
            well
          </p>
        </Notes>
      </Slide>

      <Slide>
        The 'consumeItem' function makes the dependencies of useEffect Hook (at
        line 533) change on every render. Move it inside the useEffect callback.
        Alternatively, wrap the definition of 'consumeItem' in its own
        useCallback() Hook.eslintreact-hooks/exhaustive-deps
      </Slide>

      <Slide>
        <Code>{extractConsumeItemCode}</Code>
        <Notes>explanation for linter error</Notes>
      </Slide>

      <Slide>
        <Code>{memoisedConsumeItem}</Code>
        <Fragment>{callbackisedConsumeItem}</Fragment>
        <Notes>luckily we have a tool for this already</Notes>
      </Slide>
    </>
  )
}

const unmemoisedCode = `const sortedItems = [...items].sort(sortFunction(sortBy))`
const memoisedCode = `const sortedItems = useMemo(() => [...items].sort(sortFunction(sortBy)), [items, sortBy])`
