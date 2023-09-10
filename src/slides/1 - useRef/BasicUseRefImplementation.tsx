import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"
import { SingleRefImplementation, singleRefCode } from "./SingleRef"
import { NoCurrentRef } from "./NoCurrentRef"
import { abridgedRenderCounterCode } from "../../demos/RenderCounter"

export function BasicUseRefImplementation() {
  return (
    <>
      <SingleRefImplementation />
      <Slide>
        <h2>Why do we need current?</h2>
      </Slide>
      <NoCurrentRef />
      <Slide>
        <Code>{singleRefCode}</Code>
        <Code>{abridgedRenderCounterCode}</Code>
      </Slide>
    </>
  )
}

export function RefContainer({
  isBackground,
  current,
}: {
  isBackground?: boolean
  current?: string
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        display: "flex",
        gap: ".25em",
        alignItems: "center",
        opacity: isBackground ? ".4" : 1,
      }}
    >
      <code>ref</code>➡️
      <img alt="a container" src="./box.jpeg" style={{ width: "150px" }} />
      {current && (
        <div
          style={{
            position: "absolute",
            right: "0",
            width: "150px",
            color: "black",
          }}
        >
          {current}
        </div>
      )}
    </div>
  )
}
export function CountContainer() {
  return (
    <div
      style={{
        position: "absolute",
        top: "115px",
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>⬆️</div>
      <code>count</code>
    </div>
  )
}
