import { Slide } from "../../helpers/Slide"
import { RenderTraps } from "./RenderTraps"
import { UseRefNoRerender } from "./UseRefNoRerender"
import { UseStateImplementation } from "./UseStateImplementation"

export function UseState() {
  return (
    <>
      <UseRefNoRerender />
      <UseStateImplementation />
      <RenderTraps />
      <Slide>
        <h2>useState</h2>
        <ul>
          <li>store states between renders</li>
          <li>causes a re-render when updated</li>
          <li>only re-renders when state is an actual different object</li>
        </ul>
      </Slide>
    </>
  )
}
