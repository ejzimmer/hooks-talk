import { useRef } from "react"
import { InventorySlide, useDodgyEventHandlers } from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import {
  Fragment,
  InverseTitle,
  Notes,
  ShinyTitle,
  Slide,
} from "../../helpers/Slide"
import {
  InventoryManager,
  UpdateableInventory,
  addToInventoryNotWorkingCode,
  inventoryWithUseEffectCode,
  updateableInventoryCode,
} from "../../demos/Inventory/AddToInventory"

// oh no though everything is fucked - doesn't work with sort & filter, can't add, everything is bad
// we could add more useEffects and make it terrible but
// app state (use items) vs state that can be calculated (filter & sort) => don't store calculatable values
// https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state
// If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
// working code
// working demo
// but what if my calculations are expensive?
// useMemo
// code with useMemo
// step through code with useMemo
// summary - no redundant state, test performance, useMemo
// add buttons
// extract repeated code
// callback causing re-render problem
// fix with useMemo but isn't it a bit icky
// useCallback shiny slide
// useCallback = useMemo for functions
// transform code from useMemo to useCallback
// now everything works great yay - demo
// summary
// further reading
// thanks

export function UseMemo() {
  return (
    <>
      <InventorySlide />
      <AddToInventorySlide inventoryComponent={UpdateableInventory} />
      <Slide>
        <Code fontSize=".4em" highlightLines="|8-11|4|12">
          {addToInventoryNotWorkingCode}
        </Code>
      </Slide>
      <Slide>
        <Notes>
          it doesn't work because right at the start of the component we set the
          state from the props and then just use the state
        </Notes>
      </Slide>

      <Slide>
        <Code fontSize=".4em" highlightLines="8-10">
          {inventoryWithUseEffectCode}
        </Code>
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
        <cite className="footnote">
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
        <h2>use props directly</h2>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="|1|2|4|6-8">
          {updateableInventoryCode}
        </Code>
      </Slide>
      <AddToInventorySlide inventoryComponent={UpdateableInventory} />

      <Slide>
        <h2>But what if my calculation is really expensive?</h2>
      </Slide>
      <ShinyTitle title="useMemo" />
      <InverseTitle>
        <h2>useMemo</h2>
        <ul>
          <Fragment as="li">memoise a value</Fragment>
          <Fragment as="li">ie only recalculate if it changes</Fragment>
        </ul>
      </InverseTitle>
      <Slide data-transition="slide-in fade-out">
        <Code>{unmemoisedCode}</Code>
        <Fragment>
          <Code>{memoisedCode}</Code>
        </Fragment>
      </Slide>
      <Slide data-transition="fade-in slide-out">
        <Code highlightLines="2|3">{memoisedCode}</Code>
      </Slide>
      <Slide>
        <h2>useMemo</h2>
        <ul>
          <li>calculates a value</li>
          <li>only recalculates the value if the dependencies change</li>
        </ul>
      </Slide>
    </>
  )
}

const unmemoisedCode = `const sortedItems = [...items].sort(sortFunction(sortBy))`
const memoisedCode = `const sortedItems = useMemo(
  () => [...items].sort(sortFunction(sortBy)), 
  [items, sortBy]
)`

export function AddToInventorySlide({
  inventoryComponent,
}: {
  inventoryComponent: any
}) {
  const addToInventoryRef = useRef(null)
  const { isCurrent } = useDodgyEventHandlers(addToInventoryRef.current)

  return (
    <Slide ref={addToInventoryRef}>
      <InventoryManager
        isCurrent={isCurrent}
        inventoryComponent={inventoryComponent}
      />
    </Slide>
  )
}
