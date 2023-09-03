import { abridgedRenderCounterCode } from "../../demos/RenderCounter"
import { Code } from "../../helpers/Code"
import { Slide, Fragment } from "../../helpers/Slide"
import { RefContainer, CountContainer } from "./BasicUseRefImplementation"

export const singleRefCode = `const React = {
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
      <Slide data-transition="none-out">
        <Fragment index={2} className="fade custom">
          <Code highlightLines="">{singleRefCode}</Code>
        </Fragment>
        <Fragment index={1} className="fade custom">
          <Code highlightLines="">{abridgedRenderCounterCode}</Code>
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1,2,3,12">{singleRefCode}</Code>
        <Code highlightLines="" className="background">
          {abridgedRenderCounterCode}
        </Code>
        <Fragment>
          <RefContainer />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefCode}</Code>
        <Code highlightLines="1,7|2">{abridgedRenderCounterCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <div style={{ position: "relative" }}>
          <Code highlightLines="1-3,5,11,12|1-3,5,6,8,12">{singleRefCode}</Code>
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
        <Code highlightLines="1-3,6,8,12|1-3,7,12">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,7,12|1-3,10,12">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,10,12">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefCode}</Code>
        <Code highlightLines="2|4">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefCode}</Code>
        <Code highlightLines="4|6">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefCode}</Code>
        <Code highlightLines="" className="background">
          {abridgedRenderCounterCode}
        </Code>
        <RefContainer current="current: 1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefCode}</Code>
        <Code highlightLines="1,7|2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,5,11,12|1-3,6,8,12|1-3,10,12">
          {singleRefCode}
        </Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,10,12|1-3,12">{singleRefCode}</Code>
        <Code highlightLines="2">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefCode}</Code>
        <Code highlightLines="4">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none-in">
        <Code highlightLines="1-3,12">{singleRefCode}</Code>
        <Code highlightLines="4|6">{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 2" />
        <CountContainer />
      </Slide>
    </>
  )
}
