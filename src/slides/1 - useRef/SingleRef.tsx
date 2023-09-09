import { abridgedRenderCounterCode } from "../../demos/RenderCounter"
import { Code } from "../../helpers/Code"
import { Slide, Fragment } from "../../helpers/Slide"
import { RefContainer, CountContainer } from "./BasicUseRefImplementation"

export const singleRefCode = `const React = () => {
  ...
  let ref = {};

  export function useRef(initialValue) {
    if (!('current' in ref)) {
      ref.current = initialValue;
    }

    return ref;
  }
}
`

export function SingleRefImplementation() {
  return (
    <>
      {/* intro */}
      <Slide data-transition="none-out">
        <Fragment index={2} className="fade custom">
          <Code highlightLines="">{singleRefCode}</Code>
        </Fragment>
        <Fragment index={1} className="fade custom">
          <Code highlightLines="">{abridgedRenderCounterCode}</Code>
        </Fragment>
      </Slide>

      {/* react initialisation */}
      <Slide data-transition="none">
        <Code highlightLines="3">{singleRefCode}</Code>
        <Code highlightLines="" className="background">
          {abridgedRenderCounterCode}
        </Code>
        <Fragment>
          <RefContainer />
        </Fragment>
      </Slide>

      {/* call useRef */}
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefCode}
        </Code>
        <Code highlightLines="1,7|2">{abridgedRenderCounterCode}</Code>
        <RefContainer />
      </Slide>

      {/* inside useRef */}
      <Slide data-transition="none">
        <div style={{ position: "relative" }}>
          <Code highlightLines="5,11|6,8  ">{singleRefCode}</Code>
          <div
            className="fragment"
            style={{
              position: "absolute",
              top: "115px",
              bottom: "32px",
              left: "50px",
              right: "50px",
              backgroundColor: "hsl(300 50% 50% / .1)",
            }}
          />
          <div
            className="fragment"
            style={{
              position: "absolute",
              top: "0px",
              bottom: "0px",
              left: "50px",
              right: "50px",
              backgroundColor: "hsl(300 50% 50% / .1)",
            }}
          />
        </div>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="6,8|7">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="7|10">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="10">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefCode}
        </Code>
        <Code highlightLines="2|4">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefCode}
        </Code>
        <Code highlightLines="4|6">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefCode}
        </Code>
        <Code highlightLines="" className="background">
          {abridgedRenderCounterCode}
        </Code>
        <RefContainer current="current: 1" />
      </Slide>

      {/* second render */}
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefCode}
        </Code>
        <Code highlightLines="1,7|2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="5,11|6,8|10">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="10">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefCode}
        </Code>
        <Code highlightLines="4">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none-in">
        <Code highlightLines="" className="background">
          {singleRefCode}
        </Code>
        <Code highlightLines="4|6">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 2" />
        <CountContainer />
      </Slide>
    </>
  )
}
