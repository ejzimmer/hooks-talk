import { addItemFormWithCountCode } from "../../demos/Inventory/AddItemForm"
import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"

export const multipleRefsCode = `const React = {
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
  className = "",
}: {
  highlightLines?: string
  className?: string
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      style={{ maxHeight: "300px", overflow: "auto" }}
      className={className}
    >
      {multipleRefsCode}
    </Code>
  )
}

function ComponentCode({
  highlightLines = "",
  className = "",
}: {
  highlightLines?: string
  className?: string
}) {
  return (
    <Code fontSize=".4em" highlightLines={highlightLines} className={className}>
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
      <Slide data-transition="none-out">
        <Fragment index={2} className="fade custom">
          <ReactCode />
        </Fragment>
        <Fragment index={1} className="fade custom">
          <ComponentCode />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1-4,20" />
        <ComponentCode className="background" />
        <Fragment>
          <RefArray />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="1,17|2" />
        <RefArray />
      </Slide>
      <Slide data-transition="none">
        <div style={{ position: "relative" }}>
          <ReactCode highlightLines="1,20|6,17|7,9" />
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
        <ReactCode highlightLines="1,7,9,20|1-4,8,20" />
        <ComponentCode highlightLines="2" />
        <RefArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,8,20" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,11,20" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,11,20" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} pointers={[{ name: "ref" }]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,12,20" />
        <ComponentCode highlightLines="2" />
        <RefArray values={["current: null"]} pointers={[{ name: "ref" }]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,12,20|1-4,14,20" />
        <ComponentCode highlightLines="2" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,14,20" />
        <ComponentCode highlightLines="2" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,6-9,15,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,6-9,15,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,11,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,11,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,12,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,12,20|1,14,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="3" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="5-8" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ClosureEnclosure />
        <Fragment>
          <ClosurePointers />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="10-16|12-13" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ClosureEnclosure />
        <ClosurePointers />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="10-16|12-13" />
        <RefArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ClosureEnclosure />
        <ClosurePointers />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="12-13" />
        <RefArray
          currentIndex={2}
          values={["current: <input />", "current: <input />"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ClosureEnclosure />
        <ClosurePointers />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17-19" />
        <ComponentCode highlightLines="" className="background" />
        <RefArray
          currentIndex={2}
          values={["current: <input />", "current: <input />"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ClosureEnclosure />
        <ClosurePointers />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17-19" />
        <ComponentCode highlightLines="" className="background" />
        <RefArray
          currentIndex={0}
          values={["current: <input />", "current: <input />"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ClosureEnclosure />
        <ClosurePointers />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="" className="background" />
        <ComponentCode highlightLines="5-8" />
        <RefArray
          currentIndex={0}
          values={["current: <input />", "current: <input />"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <ClosureEnclosure />
        <ClosurePointers />
        <Notes>if the user clicks submit</Notes>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="1,17|2,3" />
        <RefArray
          currentIndex={0}
          values={["current: <input />", "current: <input />"]}
          pointers={[]}
        />
        <Notes>if the component renders again</Notes>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="2,3" />
        <RefArray
          currentIndex={0}
          values={["current: <input />", "current: <input />"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
        <Notes>if the component renders again</Notes>
      </Slide>
    </>
  )
}

function ClosureEnclosure() {
  return (
    <div
      style={{
        width: "610px",
        height: "90px",
        outline: "4px dashed var(--purple)",
        position: "absolute",
        bottom: "200px",
        left: "100px",
      }}
    ></div>
  )
}

function ClosurePointers() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "290px",
          height: "170px",
          borderLeft: "4px solid var(--purple)",
          left: "680px",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "270px",
          height: "190px",
          borderRight: "4px solid var(--purple)",
          borderBottom: "4px solid var(--purple)",
          left: "710px",
          width: "150px",
        }}
      ></div>
    </>
  )
}
