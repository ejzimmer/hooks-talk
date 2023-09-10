import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"

const useStateImplementationCode = `const MyReact = () => {
  let currentIndex = 0
  let oldState = [] as any[]
  let newState = [] as any[]

  function after() {
    currentIndex = 0

    const needsChange = oldState.some((item, index) => item !== newState[index])
    oldState = newState
    newState = []

    if (needsChange) {
      render()
    }
  }

  return {
    //...useEffect...,
    useState(initialValue: any) {
      if (typeof oldState[currentIndex] === "undefined") {
        oldState[currentIndex] = initialValue
        newState[currentIndex] = initialValue
      }

      const value = newState[currentIndex]
      const setterIndex = currentIndex
      const setter = (newValue: any) => {
        newState[setterIndex] = newValue
      }

      currentIndex = currentIndex + 3
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
      style={{ maxHeight: "300px", overflow: "auto" }}
      className={isBackground ? "background" : ""}
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
      className={isBackground ? "background" : ""}
    >
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
  return <></>
}
