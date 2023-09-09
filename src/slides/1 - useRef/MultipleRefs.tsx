import { addItemFormWithCountCode } from "../../demos/Inventory/AddItemForm"
import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"

export const multipleRefsCode = `const React = () => {
  ...
  let currentIndex = 0;
  const refs = [];

  export function useRef(initialValue) {
    if (typeof refs[currentIndex] === 'undefined') {
      refs[currentIndex] = { current: initialValue };
    }

    const ref = refs[currentIndex];
    currentIndex++;

    return ref;
  }

  function after() {
    currentIndex = 0;
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
      style={{ maxHeight: "300px", overflow: "auto" }}
      className={isBackground ? "background" : ""}
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
      className={isBackground ? "background" : ""}
      isTwoUp
    >
      {addItemFormWithCountCode}
    </Code>
  )
}

function RefArray({
  currentIndex = 0,
  values = [],
  pointers = [],
}: {
  currentIndex?: number
  values?: string[]
  pointers?: { name: string }[]
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>currentIndex</code>➡️<code>{currentIndex}</code>
      </div>
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>refs</code>➡️
        <code>
          [
          {values.map((value, index) => (
            <span
              key={index}
              style={{
                color: "black",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <img
                alt="a container"
                src="./box.jpeg"
                style={{ width: "150px" }}
              />
              <div style={{ position: "absolute", fontSize: ".5em" }}>
                {value}
              </div>
            </span>
          ))}
          ]
        </code>
        {pointers.map((pointer, index) => (
          <Pointer key={pointer.name} name={pointer.name} offset={index} />
        ))}
      </div>
    </div>
  )
}

function Pointer({ name, offset }: { name: string; offset: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "155px",
        left: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateX(${offset * 230}px)`,
      }}
    >
      <div>⬆️</div>
      <code>{name}</code>
    </div>
  )
}

export function MultipleRefs() {
  return (
    <>
      {/* intro */}
      <Slide data-transition="none-out">
        <Fragment index={2} className="fade custom">
          <ReactCode />
        </Fragment>
        <Fragment index={1} className="fade custom">
          <ComponentCode />
        </Fragment>
      </Slide>

      {/* react setup */}
      <Slide data-transition="none">
        <ReactCode highlightLines="1-4,20" />
        <ComponentCode isBackground />
        <Fragment>
          <RefArray />
        </Fragment>
      </Slide>

      {/* component */}
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <ComponentCode highlightLines="1,17|2" />
        <RefArray />
      </Slide>

      {/* in useRef */}
      <Slide data-transition="none">
        <div style={{ position: "relative" }}>
          <ReactCode highlightLines="6,15|7,9" />
          <div
            className="fragment"
            style={{
              position: "absolute",
              top: "104px",
              bottom: "0px",
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
        <ComponentCode highlightLines="2" />
        <RefArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="7,9|8" />
        <ComponentCode highlightLines="2" />
        <RefArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="8" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="11" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} pointers={[{ name: "ref" }]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="12" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} pointers={[{ name: "ref" }]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="12|14" />
        <ComponentCode highlightLines="2" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14" />
        <ComponentCode highlightLines="2" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="6-9,15" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="6-9,15" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="11" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="11" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="12" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="12|14" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <ComponentCode highlightLines="5,8|10-16|12-13" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <ComponentCode highlightLines="12-13" />
        <RefArray
          currentIndex={2}
          values={["current: <input />", "current: <input />"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <ComponentCode highlightLines="" isBackground />
        <RefArray
          currentIndex={2}
          values={["current: <input />", "current: <input />"]}
          pointers={[]}
        />
      </Slide>

      {/* onClick */}
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <RefArray
          currentIndex={2}
          values={["current: <input />", "current: <input />"]}
          pointers={[]}
        />
        <div style={{ position: "relative" }}>
          <ComponentCode highlightLines="5-8" />
          <Fragment>
            <ClosureEnclosure />
          </Fragment>
          <Fragment>
            <ClosureScope />
          </Fragment>
        </div>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="" isBackground />
        <RefArray
          currentIndex={2}
          values={["current: <input />", "current: <input />"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ComponentCode highlightLines="5-8" />
      </Slide>

      <Slide data-transition="none">
        <ReactCode highlightLines="" />
        <ComponentCode highlightLines="" />
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
        bottom: "130px",
        left: "50px",
        right: "50px",
        backgroundColor: "hsl(300 50% 50% / .1)",
      }}
    ></div>
  )
}

function ClosureScope() {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        bottom: "0px",
        left: "50px",
        right: "50px",
        backgroundColor: "hsl(300 50% 50% / .1)",
      }}
    ></div>
  )
}
