import { InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
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
        <h2>Erin Zimmer</h2>
        <p>Atlassian</p>
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
      <InverseTitle>Why hooks?</InverseTitle>
      <TwoKindsOfComponents />
      <WhyFunctionalComponents />
      <FunctionalComponentProblems highlighted={0} />
      <RenderCounterSlides />
      <ShinyTitle title="useRef" />
    </>
  )
}
