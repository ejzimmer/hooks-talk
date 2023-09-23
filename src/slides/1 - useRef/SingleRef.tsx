import { abridgedRenderCounterCode } from "../../demos/RenderCounter"
import { Code, Props as CodeProps } from "../../helpers/Code"
import { Slide, Fragment } from "../../helpers/Slide"
import { Box } from "../../helpers/StepByStep"

export const singleRefCode = `const FakeReact = () => {
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
`

function SingleRefCode(props: Omit<CodeProps, "children">) {
  return <Code {...props}>{singleRefCode}</Code>
}

function ComponentCode(props: Omit<CodeProps, "children">) {
  return <Code {...props}>{abridgedRenderCounterCode}</Code>
}

function Vars({ current, count }: { current?: string; count?: boolean }) {
  return (
    <div
      style={{
        width: "320px",
        height: "110px",
        background: "hsl(0 0% 100% / .1)",
        position: "fixed",
        top: 0,
        right: 0,
        fontFamily: "Courier",
        padding: ".5em",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
        <div>
          <div style={{ display: "flex" }}>
            ref
            <svg
              viewBox="0 0 100 10"
              width="90px"
              stroke="white"
              style={{ markerEnd: "url(#white)" }}
            >
              <line x1="0" y1="5" x2="100" y2="5" strokeWidth="3" />
            </svg>
          </div>
          {count && (
            <div
              style={{
                color: "var(--primary-colour)",
                display: "flex",
                gridColumn: "1",
              }}
            >
              count
              <svg viewBox="0 0 40 10">
                <line
                  x1="0"
                  y1="5"
                  x2="40"
                  y2="5"
                  strokeWidth="3"
                  stroke="currentColor"
                  marker-end="url(#green)"
                />
              </svg>
            </div>
          )}
        </div>
        <Box>{current ? `current: ${current}` : ""}</Box>
      </div>
    </div>
  )
}

function ArrowHeadDef() {
  return (
    <svg viewBox="0 0 10 10">
      <defs>
        <marker
          id="white"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="white"
          orient="90"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="green"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="var(--primary-colour)"
          orient="90"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="purple"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="var(--purple)"
          orient="90"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="green-up"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="var(--primary-colour)"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="purple-up"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="var(--purple)"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="white-down"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="white"
          orient="180"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="purple-down"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="var(--purple)"
          orient="180"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="white-left"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="white"
          orient="270"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="green-left"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="var(--primary-colour)"
          orient="270"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
        <marker
          id="purple-left"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="10"
          strokeWidth="0"
          fill="var(--purple)"
          orient="270"
        >
          <path d="M 0 5 a 5 5, 0, 0, 0, 10 0 z" />
        </marker>
      </defs>
    </svg>
  )
}

export function SingleRefImplementation() {
  return (
    <>
      <ArrowHeadDef />
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
          <Vars />
        </Fragment>
      </Slide>

      {/* call useRef */}
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="1,7|2" />
        <Vars />
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
        <Vars />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="7,9|8" />
        <ComponentCode highlightLines="2" />
        <Vars />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="8|11" />
        <ComponentCode highlightLines="2" />
        <Vars current="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <Vars current="0" count />
      </Slide>

      {/* back in the component */}
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="2|4" />
        <Vars current="0" count />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="4|6" />
        <Vars current="1" count />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <Code isBackground>{abridgedRenderCounterCode}</Code>
        <Vars current="1" />
      </Slide>

      {/* second render */}
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="1,7|2" />
        <Vars current="1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="6,12|7,9|11" />
        <ComponentCode highlightLines="2" />
        <Vars current="1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <Vars current="1" count />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="4" />
        <Vars current="1" count />
      </Slide>
      <Slide data-transition="none">
        <Code isBackground>{singleRefCode}</Code>
        <ComponentCode highlightLines="4|6" />
        <Vars current="2" count />
      </Slide>
    </>
  )
}
