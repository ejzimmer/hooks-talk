import { ReactNode } from "react"
import { Code } from "../../helpers/Code"
import { Fragment, Slide } from "../../helpers/Slide"

const useEffectImplementationCode = `const FakeReact = () => {
  let currentIndex = 0
  let effects = []

  function after() {
    effects.forEach((effect) => {
      const needsCleanup = dependenciesChanged(effect) || isUnmounting()
      if (needsCleanup && effect.cleanup) {
        effect.cleanup()
      }
    })

    effects = effects.map((effect) => {
      if (!effect.deps || !effect.prevDeps || dependenciesChanged(effect)) {
        return {
          prevDeps: effect.deps,
          cleanup: effect.callback(),
        }
      }

      return effect
    })

    currentIndex = 0;
  }

  function dependenciesChanged(effect) {
    if (!effect.prevDeps) {
      return false
    }
    return effect.deps.some((dep, index) => dep !== effect.prevDeps?.[index])
  }

  return {
    // ... useRef ...
    // ... useState ...
    useEffect(callback, deps) {
      if (typeof effects[currentIndex] === "undefined") {
        effects[currentIndex] = { callback, deps }
      } else {
        effects[currentIndex] = {
          ...effects[currentIndex],
          callback,
          deps,
        }
      }
      
      currentIndex++;
    }
  }
}
`

export const keyboardShortcutCode = `function ItemList({ items, setItems }) {

  useEffect(
    () => {
      const onKeyDown = (event) => {
        if (!event.key.match(/^[0-9]$/)) return
        const indexToUpdate = Number.parseInt(event.key) - 1
        const itemToUpdate = itemsToShow[indexToUpdate]
        setItems(
          items.map((i) => (i === item ? { ...i, count: --i.count } : i))
        )
      }

      window.addEventListener("keydown", onKeyDown)

      return () => window.removeEventListener("keydown", onKeyDown)
    }, 
    [items, setItems]
  )

  return (...)
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
      isBackground={isBackground}
      isTwoUp
    >
      {useEffectImplementationCode}
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
      isBackground={isBackground}
      isTwoUp
    >
      {keyboardShortcutCode}
    </Code>
  )
}

function Vars({
  currentIndex,
  effects,
  items,
  setItems,
  callback,
  deps,
  hideHookVars,
}: {
  currentIndex: number
  effects?: boolean
  items?: string[]
  setItems?: true
  callback?: boolean
  deps?: boolean | string[]
  hideHookVars?: boolean
}) {
  return (
    <div
      style={{
        width: "435px",
        height: "230px",
        background: "hsl(0 0% 100% / .1)",
        position: "fixed",
        top: 0,
        right: 0,
        fontFamily: "Courier",
        padding: ".5em",
        lineHeight: ".8",
      }}
    >
      <SimpleVar name="currentIndex">{currentIndex}</SimpleVar>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        effects
        <svg
          viewBox="0 0 10 10"
          stroke="white"
          width="10px"
          style={{ markerEnd: "url(#white)" }}
        >
          <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
        </svg>
        [
        {effects && (
          <span>
            &#x7b;
            <svg
              viewBox="0 0 70 70"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
              style={{
                position: "absolute",
                top: "50px",
                left: "220px",
                width: "70px",
                height: "70px",
                markerEnd: "url(#white-down)",
              }}
            >
              <path d="M15,10 C50 10, 50 40, 50 40" />
            </svg>
            <svg
              viewBox="0 0 140 80"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
              style={{
                position: "absolute",
                top: "50px",
                left: "220px",
                width: "140px",
                height: "80px",
                markerEnd: "url(#white-down)",
              }}
            >
              <path d="M15,20 C50 20, 140 10, 130 80" />
            </svg>
            &#x7d;
          </span>
        )}
        ]
      </div>

      {/* component props */}
      <div style={{ marginTop: ".25em" }}>
        {items && (
          <SimpleVar name="items" scope="component">
            [<span style={{ fontSize: ".8em" }}>{items?.join()}</span>]
          </SimpleVar>
        )}
        {setItems && (
          <SimpleVar name="setItems" scope="component">
            <span style={{ fontSize: ".8em" }}>🔑</span>
          </SimpleVar>
        )}
      </div>

      {/* hook props */}
      <div style={{ marginTop: ".25em" }}>
        {callback && (
          <SimpleVar name="callback" scope="hook" hideVarName={hideHookVars}>
            <span style={{ fontSize: ".8em", position: "relative" }}>
              🦻
              <span
                style={{
                  fontSize: ".6em",
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                }}
              >
                ➕
              </span>
            </span>
          </SimpleVar>
        )}
        {deps === true && (
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              color: "var(--purple)",
            }}
          >
            deps
            <svg
              viewBox="0 0 10 10"
              stroke="currentColor"
              width="10px"
              style={{ markerEnd: "url(#purple)" }}
            >
              <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
            </svg>
            [
            <svg
              viewBox="0 0 210 120"
              style={{
                width: "210px",
                height: "120px",
                position: "absolute",
                left: "145px",
                top: "120px",
                stroke: "currentColor",
                markerEnd: "url(#purple-up)",
                fill: "none",
              }}
            >
              <path d="M5,110 C205 110,205 110,200 3" strokeWidth="3" />
            </svg>
            ,{" "}
            <svg
              viewBox="0 0 210 120"
              style={{
                width: "210px",
                height: "120px",
                position: "absolute",
                left: "145px",
                top: "120px",
                stroke: "currentColor",
                markerEnd: "url(#purple-left)",
                fill: "none",
              }}
            >
              <path d="M5,110 C205 110,205 20,150 20" strokeWidth="3" />
            </svg>
            ]
          </div>
        )}
        {Array.isArray(deps) && (
          <SimpleVar name="deps" scope="hook" hideVarName={hideHookVars}>
            [
            <span style={{ color: "var(--primary-colour)" }}>
              [<span style={{ fontSize: ".8em" }}>{deps.join()}</span>]
            </span>
            , <span style={{ fontSize: ".8em" }}>🔑</span>]
          </SimpleVar>
        )}
      </div>
    </div>
  )
}

function SimpleVar({
  name,
  scope,
  children,
  hideVarName,
}: {
  name: string
  children: ReactNode
  scope?: "hook" | "component"
  hideVarName?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        color:
          scope === "hook"
            ? "var(--purple)"
            : scope === "component"
            ? "var(--primary-colour)"
            : "white",
      }}
    >
      <span style={{ opacity: hideVarName ? 0 : 1 }}>
        {name}
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
      </span>
      {children}
    </div>
  )
}

export function UseEffectImplementation() {
  return (
    <>
      {/* react setup */}
      <Slide data-transition="none">
        <ReactCode highlightLines="1-3,53" />
        <ComponentCode isBackground />
        <Fragment>
          <Vars currentIndex={0} />
        </Fragment>
      </Slide>

      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,22|3-19" />
        <Vars currentIndex={0} items={["🍎", "🍇", "🍠"]} setItems />
      </Slide>

      <Slide data-transition="none">
        <ReactCode highlightLines="37,49" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={0}
          items={["🍎", "🍇", "🍠"]}
          setItems
          callback
          deps
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="37,49|38,40,46|39" />
        <ComponentCode isBackground />
        <Vars currentIndex={0} callback deps={["🍎", "🍇", "🍠"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="39|48" />
        <ComponentCode isBackground />
        <Vars currentIndex={0} callback deps={["🍎", "🍇", "🍠"]} effects />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="48" />
        <ComponentCode isBackground />
        <Vars currentIndex={1} callback deps={["🍎", "🍇", "🍠"]} effects />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="21" />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects
          hideHookVars
        />
      </Slide>

      {/* unannotated */}
      <Slide data-transition="none">
        <ReactCode highlightLines="5,25|6-11|6,11|7|27,32|28,30|29|7|8,10|13-22|13,22|14,19|15-18|16|17|24" />
        <ComponentCode isBackground />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5-12|9-11|1,22|3,19" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="37,50|38,40,46|41-45|41,42,45|41,43,44,45|48" />
        <ComponentCode isBackground />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="21" />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5,25|6-11|7|27,32|28,30|31|7|8,10|9|13-22|14,19|15-18|16|17|24" />
        <ComponentCode isBackground />
      </Slide>
    </>
  )
}
