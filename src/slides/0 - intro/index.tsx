import { ShinyTitle } from "../../helpers/Slide"
import { FunctionalComponentProblems } from "./FunctionalComponentsProblems"
import { ClickCounterSlides } from "./RenderCounterSlides"
import { Title } from "./Title"
import { TwoKindsOfComponents } from "./TwoKindsOfComponents"
import { WhyFunctionalComponents } from "./WhyFunctionalComponents"

export function Intro() {
  return (
    <>
      <Title />
      <TwoKindsOfComponents />
      <WhyFunctionalComponents />
      <FunctionalComponentProblems highlighted={0} />
      <ClickCounterSlides />
      <ShinyTitle title="Hooks" />
    </>
  )
}
