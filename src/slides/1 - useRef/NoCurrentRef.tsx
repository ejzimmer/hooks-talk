import { Code, Props as CodeProps } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"

export const renderCounterWithoutCurrentCode = `function RenderCounter() {
  const count = useRef(0)

  count = count + 1

  return (...);
}
`

export const singleRefWithoutCurrentCode = `const React = {
  ...
  let ref;

  return {
    useRef(initialValue) {
      if (typeof ref ==== 'undefined') {
        ref = initialValue
      }

      return ref
    }
  }
}`

function Vars({ value, count }: { value?: string; count?: string }) {
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr min-content",
          alignContent: "start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          ref
          {value && (
            <svg
              viewBox="0 0 100 10"
              width="90px"
              height="20px"
              stroke="white"
              style={{ markerEnd: "url(#white)" }}
            >
              <line x1="0" y1="5" x2="100" y2="5" strokeWidth="3" />
            </svg>
          )}
        </div>
        <div style={{ marginTop: "2px" }}>{value}</div>
        {count && (
          <div
            style={{
              color: "var(--primary-colour)",
              display: "flex",
              gridColumn: "span 2",
              marginTop: "-10px",
            }}
          >
            count{" "}
            {count === "0" ? (
              <svg viewBox="0 0 65 60" width="60px">
                <path
                  d="m 0 30 C 20 30, 57 50, 57 0"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  marker-end="url(#green-up)"
                />
              </svg>
            ) : (
              <>
                <svg viewBox="0 0 40 10">
                  <path
                    d="m 0 5 l 40 0"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    marker-end="url(#green)"
                  />
                </svg>
                {count}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SingleRefCode(props: Omit<CodeProps, "children">) {
  return <Code {...props}>{singleRefWithoutCurrentCode}</Code>
}

function ComponentCode(props: Omit<CodeProps, "children">) {
  return <Code {...props}>{renderCounterWithoutCurrentCode}</Code>
}

export function NoCurrentRef() {
  return (
    <>
      <Slide data-transition="none-out">
        <SingleRefCode />
        <ComponentCode />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="3" />
        <ComponentCode isBackground />
        <Vars />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="1,2,7 " />
        <Vars />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="6,7,9,12|8" />
        <ComponentCode highlightLines="2" />
        <Vars />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="8|11" />
        <ComponentCode highlightLines="2" />
        <Vars value="0" />
      </Slide>

      <Slide data-transition="none">
        <SingleRefCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <Vars value="0" count="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="2" />
        <Vars value="0" count="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="4" />
        <Vars value="0" count="0" />
      </Slide>

      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="4" />
        <Vars value="0" count="1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="6" />
        <Vars value="0" count="1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode isBackground />
        <Vars value="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="1,2,7" />
        <Vars value="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="6,7,9" />
        <ComponentCode highlightLines="2" />
        <Vars value="0" />{" "}
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <Vars value="0" count="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="4" />
        <Vars value="0" count="1" />
      </Slide>
    </>
  )
}
