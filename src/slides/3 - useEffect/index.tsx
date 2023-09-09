import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { InventorySlide } from "../../demos/Inventory"
import {
  WithoutUseEffectSlide,
  withoutUseEffectCode,
} from "../../demos/Inventory/KeyboardShortcuts"
import { Code } from "../../helpers/Code"
import { LinterError } from "../../helpers/LinterError"
import {
  UseEffectImplementation,
  keyboardShortcutCode,
} from "./UseEffectImplementation"

// demo of keyboard shortcuts working
// code without useEffect and how broken it is
// code for working shortcuts (with clean up & everything)
// 3 things we need: callback, dependency array controls when callback is called, return value does cleanup
// step through code
// uses for useEffect
// no dependency array vs missing dependencies - linter
// summary - for things outside react's control. callback called after render when dependencies change. clean up with returned function

export function UseEffect() {
  return (
    <>
      <InventorySlide />
      <Slide>
        <Code>{withoutUseEffectCode}</Code>
      </Slide>
      <WithoutUseEffectSlide />
      <ShinyTitle title="useEffect" />
      <InverseTitle>
        <h2>useEffect</h2>
        <ul>
          <Fragment as="li">handle stuff that's not managed by React</Fragment>
        </ul>
      </InverseTitle>
      <Slide>
        <Code fontSize=".4em" highlightLines="|6-22|6,22|7-20|21|7-20|8-17|19">
          {keyboardShortcutCode}
        </Code>
      </Slide>
      <Slide>
        <ul>
          <Fragment as="li">
            <span style={{ color: "var(--primary-colour)" }}>callback</span>:
            what we want to happen
          </Fragment>
          <Fragment as="li">
            <span style={{ color: "var(--primary-colour)" }}>dependencies</span>
            : when the callback gets called
          </Fragment>
          <Fragment as="li">
            <span style={{ color: "var(--primary-colour)" }}>
              cleanup function
            </span>
            : returned from callback
          </Fragment>
        </ul>
      </Slide>
      <UseEffectImplementation />
      <Slide>
        <ul>
          <li>native event handlers</li>
          <Fragment as="li">
            setTimeout/setInterval/requestAnimationFrame
          </Fragment>
          <Fragment as="li">making API calls</Fragment>
          <Fragment as="li">interacting with 3rd party libraries</Fragment>
        </ul>
      </Slide>
      <Slide>
        <h2>dependency array gotchas</h2>
        no dependency array = run on every render. do you really need an effect?
        empty dependency array = run only once missing dependencies could break
        things so use linter
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
    </>
  )
}
