import { addItemFormWithCountCode } from "../../demos/Inventory/AddItemForm"
import { Code } from "../../helpers/Code"
import { Fragment, Slide } from "../../helpers/Slide"
import { Box } from "../../helpers/StepByStep"

export const multipleRefsCode = `const FakeReact = () => {
  ...
  let currentIndex = 0;
  const refs = [];

  function after() {
    currentIndex = 0;
  }

  return {
    useRef(initialValue) {
      if (typeof refs[currentIndex] === 'undefined') {
        refs[currentIndex] = { current: initialValue };
      }

      const ref = refs[currentIndex];
      currentIndex++;

      return ref;
    }
  }
}`

function ReactCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string
  isBackground?: boolean
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      isBackground={isBackground || highlightLines === ""}
      isTwoUp
    >
      {multipleRefsCode}
    </Code>
  )
}

function ComponentCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string
  isBackground?: boolean
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      isBackground={isBackground || highlightLines === ""}
      isTwoUp
    >
      {addItemFormWithCountCode}
    </Code>
  )
}

function Vars({
  currentIndex,
  refs,
  nameRef,
  countRef,
  refPointer,
}: {
  currentIndex: number
  refs?: string[]
  nameRef?: boolean
  countRef?: boolean
  refPointer?: 0 | 1
}) {
  return (
    <div
      style={{
        width: "420px",
        height: "230px",
        background: "hsl(0 0% 0% / .2)",
        position: "fixed",
        top: 0,
        right: 0,
        fontFamily: "Courier",
        padding: ".5em",
      }}
    >
      <div style={{ display: "flex" }}>
        currentIndex
        <svg
          viewBox="0 0 30 10"
          width="30px"
          stroke="white"
          style={{ markerEnd: "url(#white)" }}
        >
          <line x1="0" y1="5" x2="30" y2="5" strokeWidth="3" />
        </svg>
        {currentIndex}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        refs
        <svg
          viewBox="0 0 10 10"
          stroke="white"
          width="10px"
          style={{ markerEnd: "url(#white)" }}
        >
          <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              height: "90px",
              width: "10px",
              border: "4px solid",
              borderRight: "none",
              marginLeft: "5px",
            }}
          />
          {refs?.map((ref, index) => (
            <Box key={index} fontSize=".5em" width={120}>
              {ref}
            </Box>
          ))}
          <div
            style={{
              height: "90px",
              width: "10px",
              border: "4px solid",
              borderLeft: "none",
            }}
          />
        </div>
      </div>
      <div style={{ color: "var(--primary-colour)" }}>
        {nameRef && <Pointer position={1} label="nameRef" />}
        {countRef && <Pointer position={0} label="countRef" />}
      </div>
      {typeof refPointer !== "undefined" && (
        <div style={{ color: "var(--purple)" }}>
          <Pointer position={refPointer} label="ref" />
        </div>
      )}
    </div>
  )
}

function Pointer({ position, label }: { position: 0 | 1; label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        top: "170px",
        alignItems: position ? "end" : "",
        left: position ? "180px" : "10px",
        flexDirection: position ? "column-reverse" : "row",
      }}
    >
      <div
        style={{
          width: "180px",
          textAlign: "end",
          marginTop: position ? "" : "10px",
        }}
      >
        {label}
      </div>
      <svg
        viewBox={position ? "0 0 10 40" : "0 0 100 60"}
        width={position ? "20px" : "100px"}
        height={position ? "40px" : "60px"}
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        style={{
          markerEnd: label === "ref" ? "url(#purple-up)" : "url(#green-up)",
        }}
      >
        {position ? (
          <line x1="5" y1="60" x2="5" y2="0" />
        ) : (
          <path d="M 20 30 Q 50 25, 50 0, 50 0" />
        )}
      </svg>
    </div>
  )
}

export function MultipleRefs() {
  return (
    <>
      {/* intro */}
      <Slide data-transition="none-out">
        <ReactCode />
        <ComponentCode />
      </Slide>

      {/* react setup */}
      <Slide data-transition="none">
        <ReactCode highlightLines="1-4,20" />
        <ComponentCode isBackground />
        <Fragment>
          <Vars currentIndex={0} />
        </Fragment>
      </Slide>

      {/* component */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,17|2" />
        <Vars currentIndex={0} />
      </Slide>

      {/* in useRef */}
      <Slide data-transition="none">
        <ReactCode highlightLines="11,20" />
        <ComponentCode />
        <Vars currentIndex={0} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="11,20|12,14|13" />
        <ComponentCode />
        <Vars currentIndex={0} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13" />
        <ComponentCode />
        <Vars currentIndex={0} refs={["current: null"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16" />
        <ComponentCode />
        <Vars currentIndex={0} refs={["current: null"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16" />
        <ComponentCode />
        <Vars currentIndex={0} refs={["current: null"]} refPointer={0} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17" />
        <ComponentCode />
        <Vars currentIndex={0} refs={["current: null"]} refPointer={0} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17|19" />
        <ComponentCode />
        <Vars currentIndex={1} refs={["current: null"]} refPointer={0} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="2" />
        <Vars currentIndex={1} refs={["current: null"]} countRef />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="3" />
        <Vars currentIndex={1} refs={["current: null"]} countRef />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="11,12,14,20|13" />
        <ComponentCode />
        <Vars currentIndex={1} refs={["current: null"]} countRef />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          refs={["current: null", "current: null"]}
          countRef
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          refs={["current: null", "current: null"]}
          countRef
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          refs={["current: null", "current: null"]}
          countRef
          refPointer={1}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          refs={["current: null", "current: null"]}
          countRef
          refPointer={1}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17|19" />
        <ComponentCode />
        <Vars
          currentIndex={2}
          refs={["current: null", "current: null"]}
          countRef
          refPointer={1}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="3" />
        <Vars
          currentIndex={2}
          refs={["current: null", "current: null"]}
          nameRef
          countRef
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5,8|10-16|12-13" />
        <Vars
          currentIndex={2}
          refs={["current: null", "current: null"]}
          nameRef
          countRef
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="12-13" />
        <Vars
          currentIndex={2}
          refs={["current: <input />", "current: <input />"]}
          nameRef
          countRef
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="6-8|7" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={2}
          refs={["current: <input />", "current: <input />"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="7" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={0}
          refs={["current: <input />", "current: <input />"]}
        />
      </Slide>

      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode isBackground />
        <Vars
          currentIndex={0}
          refs={["current: <input />", "current: <input />"]}
        />
      </Slide>

      {/* onClick */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5-8" />

        <Vars
          currentIndex={0}
          refs={["current: <input />", "current: <input />"]}
        />
        <Fragment>
          <ClosureEnclosure />
        </Fragment>
        <Fragment>
          <ClosureScope />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5-8|7" />
        <Vars
          currentIndex={0}
          refs={["current: <input />", "current: <input />"]}
          nameRef
          countRef
        />
      </Slide>

      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode />
      </Slide>
    </>
  )
}

function ClosureEnclosure() {
  return (
    <div
      style={{
        height: "90px",
        position: "absolute",
        bottom: "-195px",
        left: "50px",
        right: "50px",
        backgroundColor: "hsl(155 62% 56% / .1)",
      }}
    ></div>
  )
}

function ClosureScope() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "-320px",
        left: "50px",
        right: "50px",
        backgroundColor: "hsl(155 62% 56% / .1)",
        height: "307px",
      }}
    ></div>
  )
}
