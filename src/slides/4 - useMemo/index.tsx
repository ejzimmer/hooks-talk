import { useRef } from "react"
import {
  AddToInventory,
  AddToInventoryNotWorking,
  addToInventoryNotWorkingCode,
  inventoryCode,
  inventoryWithUseEffectCode,
  updateableInventoryCode,
  useDodgyEventHandlers,
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
      <AddToInventorySlide />
      <Slide>
        <Code fontSize=".4em" highlightLines="|8-11|4|12">
          {addToInventoryNotWorkingCode}
        </Code>
      </Slide>
      <AddToInventoryNotWorkingSlide />
      <Slide>
        <Code fontSize=".3em" highlightLines="2|5,14,19,28">
          {inventoryCode}
        </Code>
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
      <AddToInventorySlide />

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

export function AddToInventorySlide() {
  const addToInventoryRef = useRef(null)
  const { isCurrent } = useDodgyEventHandlers(addToInventoryRef.current)
  return (
    <Slide ref={addToInventoryRef}>
      <AddToInventory isCurrent={isCurrent} />
    </Slide>
  )
}

export function AddToInventoryNotWorkingSlide() {
  const addToInventoryRef = useRef(null)
  const { isCurrent } = useDodgyEventHandlers(addToInventoryRef.current)
  return (
    <Slide ref={addToInventoryRef}>
      <AddToInventoryNotWorking isCurrent={isCurrent} />
    </Slide>
  )
}
