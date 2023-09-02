import { Slide, Fragment } from "../../../helpers/Slide"
import { ArrayMethods } from "./ArrayMethods"
import { InfiniteRenderLoop } from "./InfiniteRenderLoop"
import { MultipleCallsToUseState } from "./MultipleCallsToUseState"
import { NoRerender } from "./NoRerender"

export function RenderTraps() {
  return (
    <>
      <Slide>
        <ul>
          <Fragment as="li">One render per task</Fragment>
          <Fragment as="li">Only render on change</Fragment>
        </ul>
      </Slide>
      <MultipleCallsToUseState />
      <NoRerender />
      <InfiniteRenderLoop />
      <ArrayMethods />
    </>
  )
}
