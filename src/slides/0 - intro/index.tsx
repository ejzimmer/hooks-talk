import { ShinyTitle, Slide } from "../../helpers/Slide"
import { FunctionalComponentProblems } from "./FunctionalComponentsProblems"
import { RenderCounterSlides } from "./RenderCounterSlides"
import { Title } from "./Title"
import { TwoKindsOfComponents } from "./TwoKindsOfComponents"
import { WhyFunctionalComponents } from "./WhyFunctionalComponents"

export function Intro() {
  return (
    <>
      <Title />
      <Slide>
        <div style={{ width: "max-content", margin: "auto" }}>
          <h2>Erin Zimmer</h2>
          <a href="https://www.atlassian.com/" target="blank" rel="noreferrer">
            <img alt="Atlassian" src="/Atlassian-horizontal-blue-rgb.svg" />
          </a>
          <a href="https://hooks.ez.codes">hooks.ez.codes</a>
        </div>
      </Slide>
      <Slide>
        <ul>
          <li>Why hooks?</li>
          <li>useRef</li>
          <li>useState</li>
          <li>useEffect</li>
          <li>useMemo & useCallback</li>
        </ul>
      </Slide>
      <Slide>
        <h2 className="r-fit-text">Why hooks?</h2>
      </Slide>
      <TwoKindsOfComponents />
      <WhyFunctionalComponents />
      <FunctionalComponentProblems />
      <RenderCounterSlides />
      <ShinyTitle title="useRef" />
    </>
  )
}
