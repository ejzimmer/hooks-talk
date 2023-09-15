import { abridgedRenderCounterCode } from "../../demos/RenderCounter";
import { Code, Props as CodeProps } from "../../helpers/Code";
import { Slide, Fragment } from "../../helpers/Slide";
import { RefContainer, CountContainer } from "./BasicUseRefImplementation";

export const singleRefCode = `const React = () => {
  ...
  let ref = {};

  return {
    useRef(initialValue) {
      if (!('current' in ref)) {
        ref.current = initialValue;
      }

      return ref;
    }
  }
}
`;

function SingleRefCode(props: Omit<CodeProps, "children">) {
  return <Code {...props}>{singleRefCode}</Code>;
}

function ComponentCode(props: Omit<CodeProps, "children">) {
  return <Code {...props}>{abridgedRenderCounterCode}</Code>;
}
export function SingleRefImplementation() {
  return (
    <>
      {/* intro */}
      <Slide data-transition="none-out">
        <Fragment index={2} className="fade custom">
          <SingleRefCode />
        </Fragment>
        <Fragment index={1} className="fade custom">
          <ComponentCode />
        </Fragment>
      </Slide>

      {/* react initialisation */}
      <Slide data-transition="none">
        <SingleRefCode highlightLines="3" />
        <Code isBackground>{abridgedRenderCounterCode}</Code>
        <Fragment>
          <RefContainer />
        </Fragment>
      </Slide>

      {/* call useRef */}
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="1,7|2" />
        <RefContainer />
      </Slide>

      {/* inside useRef */}
      <Slide data-transition="none">
        <div style={{ position: "relative" }}>
          <SingleRefCode highlightLines="6,12|7,9" />
          <div
            className="fragment"
            style={{
              position: "absolute",
              top: "145px",
              bottom: "62px",
              left: "50px",
              right: "50px",
              backgroundColor: "hsl(300 50% 50% / .1)",
            }}
          />
          <div
            className="fragment"
            style={{
              position: "absolute",
              top: "35px",
              bottom: "30px",
              left: "50px",
              right: "50px",
              backgroundColor: "hsl(300 50% 50% / .1)",
            }}
          />
        </div>
        <ComponentCode highlightLines="2" />
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="7,9|8" />
        <ComponentCode highlightLines="2" />
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="7|11" />
        <ComponentCode highlightLines="2" />
        <RefContainer current="current: 0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <RefContainer current="current: 0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="2|4" />
        <RefContainer current="current: 0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="4|6" />
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <Code isBackground>{abridgedRenderCounterCode}</Code>
        <RefContainer current="current: 1" />
      </Slide>

      {/* second render */}
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="1,7|2" />
        <RefContainer current="current: 1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="6,12|7,9|11" />
        <ComponentCode highlightLines="2" />
        <RefContainer current="current: 1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="4" />
        <RefContainer current="current: 1" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none-in">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="4|6" />
        <RefContainer current="current: 2" />
        <CountContainer />
      </Slide>
    </>
  );
}
