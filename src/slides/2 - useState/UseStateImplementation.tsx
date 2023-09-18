import { ReactNode } from "react"
import { Code } from "../../helpers/Code"
import { Fragment, Slide } from "../../helpers/Slide"

const useStateImplementationCode = `const MyReact = () => {
  let currentIndex = 0
  const states = []
  let runComponent = false

  function after() {
    currentIndex = 0
  }

  return {
    onSubmit(element, handler) {
      element.addEventListener("submit", (event) => {
        handler(event)
        if (runComponent) {
          // run component
        }
      })
    },
    useRef(initialValue) {...},
    useState(initialValue) {
      if (typeof states[currentIndex] === "undefined") {
        states[currentIndex] = initialValue
      }

      const value = states[currentIndex]
      const setterIndex = currentIndex
      const setter = (value) => {
        states[setterIndex] = value
        runComponent = true
      }

      currentIndex++

      return [value, setter]
    },
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
  isBackground,
}: {
  highlightLines?: string
  isBackground?: boolean
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      isTwoUp
      isBackground={isBackground}
    >
      {useStateImplementationCode}
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
      isTwoUp
      isBackground={isBackground}
    >
      {inventoryCode}
    </Code>
  )
}

function Vars({
  currentIndex,
  runComponent,
  states,
  value,
  setterIndex,
  setter,
  inventory,
  setInventory,
  setValue,
}: {
  currentIndex: number
  runComponent: boolean
  states?: string
  value?: boolean
  setterIndex?: number
  setter?: boolean
  inventory?: boolean
  setInventory?: boolean
  setValue?: string
}) {
  return (
    <div
      style={{
        width: "380px",
        height: "230px",
        background: "hsl(0 0% 100% / .1)",
        position: "fixed",
        top: 0,
        right: 0,
        fontFamily: "Courier",
        padding: ".5em",
      }}
    >
      <SimpleVar name="currentIndex" value={`${currentIndex}`} />
      <SimpleVar name="runComponent">
        <span style={{ fontSize: ".6em" }}>{runComponent ? "✅" : "❌"}</span>
      </SimpleVar>
      <SimpleVar name="states">
        [
        <span
          style={{
            color: "var(--primary-colour)",
            position: "relative",
          }}
        >
          <span style={{ marginInline: "-.25em" }}>{states ?? ""}</span>
          {(setter || setInventory) && (
            <span
              style={{ position: "absolute", fontSize: ".6em", right: "-10px" }}
            >
              🔑
            </span>
          )}
        </span>
        ]
      </SimpleVar>
      {value && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            lineHeight: ".8",
            color: "var(--purple)",
            marginTop: ".3em",
          }}
        >
          <span>value</span>
          <svg
            viewBox="0 0 100 50"
            stroke="currentColor"
            fill="none"
            style={{
              markerEnd: "url(#purple-up)",
              position: "absolute",
              top: "110px",
              left: "150px",
              height: "50px",
              width: "100px",
            }}
          >
            <path d="M0,35 C80 35, 92,35, 92,3" strokeWidth="3" />
          </svg>
        </div>
      )}
      {inventory && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            lineHeight: ".8",
            color: "var(--primary-colour)",
            marginTop: ".3em",
          }}
        >
          <span>inventory</span>
          <svg
            viewBox="0 0 100 70"
            stroke="currentColor"
            fill="none"
            style={{
              markerEnd: "url(#green-left)",
              position: "absolute",
              top: "90px",
              left: "250px",
              height: "70px",
              width: "100px",
            }}
          >
            <path d="M0,55 C80 55, 40,25, 5,15" strokeWidth="3" />
          </svg>
        </div>
      )}
      {typeof setterIndex !== "undefined" && (
        <SimpleVar name="setterIndex" value={`${setterIndex}`} scope="hook" />
      )}
      {(setter || setInventory) && (
        <SimpleVar
          name={setter ? "setter" : "setInventory"}
          value="🔑"
          scope={setter ? "hook" : "component"}
        />
      )}
      {setValue === "states" && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              lineHeight: ".8",
              color: "var(--purple)",
              marginTop: ".3em",
            }}
          >
            <span>value</span>
            <svg
              viewBox="0 0 100 50"
              stroke="currentColor"
              fill="none"
              style={{
                markerEnd: "url(#purple-up)",
                position: "absolute",
                top: "110px",
                left: "150px",
                height: "50px",
                width: "100px",
              }}
            >
              <path d="M0,35 C80 35, 92,35, 92,3" strokeWidth="3" />
            </svg>
          </div>
          <SimpleVar name="setterIndex" value="0" scope="hook" />
        </>
      )}
      {setValue?.includes("🍎") && (
        <div style={{ marginTop: ".25em" }}>
          <SimpleVar name="value" scope="hook">
            [<span style={{ fontSize: ".7em" }}>{setValue}</span>]
          </SimpleVar>
          <SimpleVar name="setterIndex" value="0" scope="hook" />
        </div>
      )}
    </div>
  )
}

function SimpleVar({
  name,
  value,
  children,
  scope,
}: {
  name: string
  value?: string
  children?: ReactNode
  scope?: "hook" | "component"
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        lineHeight: ".8",
        color:
          scope === "hook"
            ? "var(--purple)"
            : scope === "component"
            ? "var(--primary-colour)"
            : "",
      }}
    >
      <span>{name}</span>
      <svg
        viewBox="0 0 30 10"
        width="30px"
        height="15px"
        stroke="currentColor"
        style={{
          markerEnd:
            scope === "hook"
              ? "url(#purple)"
              : scope === "component"
              ? "url(#green)"
              : "url(#white)",
        }}
      >
        <line x1="0" y1="5" x2="30" y2="5" strokeWidth="3" />
      </svg>
      <span>{children ?? value}</span>
    </div>
  )
}

export function UseStateImplementation() {
  return (
    <>
      <Slide data-transition="none-out">
        <ReactCode />
        <ComponentCode />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="2-4" />
        <ComponentCode isBackground />
        <Fragment>
          <Vars currentIndex={0} runComponent={false} />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,16|2" />
        <Vars currentIndex={0} runComponent={false} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="20,35|21,23|22" />
        <ComponentCode highlightLines="2" />
        <Vars currentIndex={0} runComponent={false} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="22|25-30|25" />
        <ComponentCode highlightLines="2" />
        <Vars currentIndex={0} runComponent={false} states="[]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="25|26" />
        <ComponentCode highlightLines="2" />
        <Vars currentIndex={0} runComponent={false} states="[]" value />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26|27-30" />
        <ComponentCode highlightLines="2" />
        <Vars
          currentIndex={0}
          runComponent={false}
          states="[]"
          value
          setterIndex={0}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27-30|32" />
        <ComponentCode highlightLines="2" />
        <Vars
          currentIndex={0}
          runComponent={false}
          states="[]"
          value
          setterIndex={0}
          setter
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="32|34" />
        <ComponentCode highlightLines="2" />
        <Vars
          currentIndex={1}
          runComponent={false}
          states="[]"
          value
          setterIndex={0}
          setter
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="2|4,8|10-15|12" />
        <Vars
          currentIndex={1}
          runComponent={false}
          states="[]"
          inventory
          setInventory
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="11,18|12-17" />
        <ComponentCode highlightLines="12" />
        <Vars
          currentIndex={1}
          runComponent={false}
          states="[]"
          inventory
          setInventory
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="10-15" />
        <Vars
          currentIndex={1}
          runComponent={false}
          states="[]"
          inventory
          setInventory
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="6,8|7" />
        <ComponentCode isBackground />
        <Vars currentIndex={1} runComponent={false} states="[]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="7" />
        <ComponentCode isBackground />
        <Vars currentIndex={0} runComponent={false} states="[]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode isBackground />
        <Vars currentIndex={0} runComponent={false} states="[]" />
      </Slide>

      {/* add item */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="12" />
        <Vars currentIndex={0} runComponent={false} states="[]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="12,17|13" />
        <ComponentCode isBackground />
        <Vars currentIndex={0} runComponent={false} states="[]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13" />
        <ComponentCode highlightLines="4-8" />
        <Vars currentIndex={0} runComponent={false} states="[]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13" />
        <ComponentCode highlightLines="4-8|5-7" />
        <Vars
          currentIndex={0}
          runComponent={false}
          states="[]"
          inventory
          setInventory
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27-30|28" />
        <ComponentCode highlightLines="5-7" />
        <Vars currentIndex={0} runComponent={false} states="[]" setValue="🍎" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="28|29" />
        <ComponentCode highlightLines="5-7" />
        <Vars
          currentIndex={0}
          runComponent={false}
          states="[🍎]"
          setValue="states"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="29" />
        <ComponentCode highlightLines="5-7" />
        <Vars
          currentIndex={0}
          runComponent={true}
          states="[🍎]"
          setValue="states"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5-7" />
        <Vars currentIndex={0} runComponent={true} states="[🍎]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13|14,16|15" />
        <ComponentCode isBackground />
        <Vars currentIndex={0} runComponent={true} states="[🍎]" />
      </Slide>

      {/* re-run component */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,2,16" />
        <Vars currentIndex={0} runComponent={true} states="[🍎]" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,2,16|4,8|10-15" />
        <Vars
          currentIndex={0}
          runComponent={true}
          states="[🍎]"
          inventory
          setInventory
        />
      </Slide>
    </>
  )
}
