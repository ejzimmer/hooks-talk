import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { InventorySlide } from "../../demos/Inventory"
import { withoutUseEffectCode } from "../../demos/Inventory/KeyboardShortcuts"
import { Code } from "../../helpers/Code"
import {
  UseEffectImplementation,
  keyboardShortcutCode,
} from "./UseEffectImplementation"

export function UseEffect() {
  return (
    <>
      <InventorySlide hideFilter hideSortButtons />
      <Slide>
        <Code highlightLines="|3-14|10|7,13|">{withoutUseEffectCode}</Code>
      </Slide>
      <ShinyTitle title="useEffect" />
      <InverseTitle>
        <h2>useEffect</h2>
        <ul>
          <Fragment as="li">handle stuff that's not managed by React</Fragment>
        </ul>
      </InverseTitle>
      <Slide>
        <Code fontSize=".4em" highlightLines="|3-19|3,19|4-17|5-14|18|16">
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
            : manage stale closures
          </Fragment>
          <Fragment as="li">
            <span style={{ color: "var(--primary-colour)" }}>
              cleanup function
            </span>
            : clean up before callback
          </Fragment>
        </ul>
      </Slide>
      <UseEffectImplementation />
      <Slide>
        <h2>Dependency arrays</h2>
        <ul>
          <Fragment as="li">Effects run at least once</Fragment>
          <Fragment as="li">No dependency array - run on every render</Fragment>
          <Fragment as="li">Empty dependency array - run once</Fragment>
        </ul>
      </Slide>
      <InverseTitle>
        <h2>Use useEffect for</h2>
        <ul>
          <li>native event handlers</li>
          <Fragment as="li">
            setTimeout/setInterval/requestAnimationFrame
          </Fragment>
          <Fragment as="li">making HTTP calls</Fragment>
          <Fragment as="li">interacting with 3rd party libraries</Fragment>
        </ul>
      </InverseTitle>
    </>
  )
}
