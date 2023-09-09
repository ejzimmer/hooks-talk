import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"

const useStateImplementationCode = `const React = {
  ...
  let currentIndex = 0;
  const state = [];

  export function useState(initialValue) {
    if (typeof state[currentIndex] === "undefined") {
      state[currentIndex] = [
        initialValue,
        (value: T) => {
          state[currentIndex][0] = value
        },
      ];
    }

    const thisState = state[currentIndex];
    currentIndex++;
    return thisState;
  }

  export function after() {
    currentIndex = 0;
    renderIfRequired();
  } 
}
`

export const inventoryCode = `function Inventory() {
  const [inventory, setInventory] = useState([])

  const addItem = (name?: string, count?: string) => {
    setInventory(
      addItemToInventory(inventory, name, count)
    )
  }

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <ItemList items={inventory} />
    </>
  )
}
`

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
      {useStateImplementationCode}
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
      {inventoryCode}
    </Code>
  )
}

function StateArray({
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
        <code>state</code>➡️
        <code style={{ display: "flex" }}>
          [
          {values.map((value, index) => (
            <div key={index} style={{ maxWidth: "220px", display: "flex" }}>
              [
              <span style={{ fontSize: ".5em", display: "inline-block" }}>
                {value}, function ()
                <span
                  style={{ fontSize: "1.5em", color: "var(--primary-colour)" }}
                >
                  ⤴
                </span>
              </span>
              ]
            </div>
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

export function UseStateImplementation() {
  return (
    <>
      <Slide data-transition="none-out">
        need to finish this whole thing
        <Fragment index={2} className="fade custom">
          <ReactCode />
        </Fragment>
        <Fragment index={1} className="fade custom">
          <ComponentCode />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1-4,25" />
        <ComponentCode className="background" />
        <Fragment>
          <StateArray />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,25" />
        <ComponentCode highlightLines="1,16|2" />
        <StateArray />
      </Slide>
      <Slide data-transition="none">
        <div style={{ position: "relative" }}>
          <ReactCode highlightLines="1,20,6,17|7,14" />
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
        <StateArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,7,14,25|1,8-13,25|1,9,25|1,10-12,25" />
        <ComponentCode highlightLines="2" />
        <StateArray />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,8-13,25" />
        <ComponentCode highlightLines="2" />
        <StateArray values={["current: []"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,16,25" />
        <ComponentCode highlightLines="2" />
        <StateArray values={["current: []"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,16,25|1,17,25" />
        <ComponentCode highlightLines="2" />
        <StateArray
          values={["current: []"]}
          pointers={[{ name: "thisState" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,17,25|1,18,25" />
        <ComponentCode highlightLines="2" />
        <StateArray
          currentIndex={1}
          values={["current: []"]}
          pointers={[{ name: "thisState" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode className="background" />
        <div style={{ position: "relative" }}>
          <ComponentCode highlightLines="2" />
          <div
            style={{
              position: "absolute",
              bottom: "300px",
              left: "220px",
              borderBottom: "2px solid var(--purple)",
              width: "620px",
              transform: "rotate(-.08turn)",
              transformOrigin: "bottom left",
            }}
          />
        </div>
        <StateArray
          currentIndex={1}
          values={["current: []"]}
          pointers={[{ name: "thisState" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,14,20" />
        <ComponentCode highlightLines="2" />
        <StateArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,6-9,15,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={1}
          values={["current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,6-9,15,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,11,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,11,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,12,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={1}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,12,20|1,14,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "ref" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="3" />
        <StateArray
          currentIndex={2}
          values={["current: null", "current: null"]}
          pointers={[{ name: "nameRef" }, { name: "countRef" }]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="5-8" />
        <StateArray
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
        <StateArray
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
        <StateArray
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
        <StateArray
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
        <StateArray
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
        <StateArray
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
        <StateArray
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
        <StateArray
          currentIndex={0}
          values={["current: <input />", "current: <input />"]}
          pointers={[]}
        />
        <Notes>if the component renders again</Notes>
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="1,20" />
        <ComponentCode highlightLines="2,3" />
        <StateArray
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
