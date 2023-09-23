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
      isBackground={isBackground || highlightLines === ""}
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
      isBackground={isBackground || highlightLines === ""}
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
  up,
  needsCleanup,
  listening,
  cleanup,
  newDeps,
  hideDepsLabel,
}: {
  currentIndex: number
  effects?: any
  items?: string[]
  setItems?: true
  callback?: boolean | number
  deps?: boolean | string[]
  hideHookVars?: boolean
  up?: boolean
  needsCleanup?: boolean
  listening?: boolean | number
  cleanup?: boolean | number
  newDeps?: string[]
  hideDepsLabel?: boolean
}) {
  return (
    <div
      style={{
        width: "435px",
        height: "310px",
        background: "hsl(0 0% 0% / .6)",
        position: "fixed",
        top: up ? 0 : "310px",
        right: 0,
        fontFamily: "Courier",
        padding: ".5em",
      }}
    >
      {listening && (
        <div
          style={
            {
              position: "absolute",
              top: 0,
              right: 0,
              "--shadow-colour":
                listening === 2 ? "var(--blue)" : "var(--purple)",
              textShadow:
                "-3px -3px 8px var(--shadow-colour),3px -3px 8px var(--shadow-colour),-3px 3px 8px var(--shadow-colour),3px 3px 8px var(--shadow-colour)",
            } as any
          }
        >
          🦻
        </div>
      )}
      <SimpleVar name="currentIndex">{currentIndex}</SimpleVar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: effects ? "-1em" : "-.2em",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "baseline" }}>
          effects
          <svg
            viewBox="0 0 10 10"
            stroke="white"
            width="15px"
            style={{ markerEnd: "url(#white)" }}
          >
            <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
          </svg>
        </span>
        <div
          style={{
            width: "10px",
            height: "80px",
            border: "4px solid",
            borderRight: "none",
            marginRight: ".1em",
          }}
        />
        <div
          style={{
            fontSize: "100px",
            letterSpacing: "-.3em",
            marginLeft: effects ? "-.3em" : 0,
            marginTop: ".2em",
            display: "flex",
          }}
        >
          {effects && (
            <>
              &#x7b;
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  gridTemplateRows: "min-content min-content",
                  fontSize: "20px",
                  letterSpacing: "normal",
                  marginLeft: ".4em",
                  marginRight: "-.9em",
                  marginTop: "30px",
                  height: "50px",
                }}
              >
                <span style={{ opacity: effects.cb ? 1 : 0 }}>
                  cb
                  <svg
                    viewBox="0 0 70 120"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="3"
                    style={{
                      position: "absolute",
                      top: "80px",
                      left: "185px",
                      width: "70px",
                      height: "120px",
                      markerEnd: "url(#white)",
                    }}
                  >
                    <path d="M60,15 C35 10, 35 110, 70 105" />
                  </svg>
                </span>
                <span style={{ opacity: effects.prevDeps ? 1 : 0 }}>
                  prevDeps
                  <svg
                    viewBox={
                      effects.prevDeps === 2 ? "0 0 50 146" : "0 0 50 96"
                    }
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="3"
                    style={{
                      position: "absolute",
                      top: "105px",
                      left: "370px",
                      width: "50px",
                      height: effects.prevDeps === 2 ? "146px" : "96px",
                      markerEnd: "url(#white-down)",
                    }}
                  >
                    <path
                      d={
                        effects.prevDeps === 2
                          ? "M10,0 L10,146"
                          : "M10,0 L10,96"
                      }
                    />
                  </svg>
                </span>
                <span style={{ opacity: effects.cleanup ? 1 : 0 }}>
                  cleanup
                  <svg
                    viewBox="0 0 30 60"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="3"
                    style={{
                      position: "absolute",
                      top: "115px",
                      left: "295px",
                      width: "30px",
                      height: "60px",
                      markerEnd: "url(#white-down)",
                    }}
                  >
                    <path d="M3,5 C30 5, 20 55, 20 55" />
                  </svg>
                </span>
                <span style={{ opacity: effects.deps ? 1 : 0 }}>
                  deps
                  <svg
                    viewBox={effects.deps === 2 ? "0 0 50 126" : "0 0 50 76"}
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="3"
                    style={{
                      position: "absolute",
                      top: "125px",
                      left: "345px",
                      width: "50px",
                      height: effects.deps === 2 ? "126px" : "76px",
                      markerEnd: "url(#white-down)",
                    }}
                  >
                    <path
                      d={effects.deps === 2 ? "M15,5 L15 126" : "M15,5 L15 76"}
                    />
                  </svg>
                </span>
              </div>
              &#x7d;
            </>
          )}
        </div>
        <div
          style={{
            width: "10px",
            height: "80px",
            border: "4px solid",
            borderLeft: "none",
            marginLeft: ".1em",
          }}
        />
      </div>

      {/* hook props */}
      <div style={{ position: "absolute", top: "165px" }}>
        {callback && (
          <SimpleVar name="callback" scope="hook" hideVarName={hideHookVars}>
            <span style={{ fontSize: ".8em", position: "relative" }}>
              🦻
              <span
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              >
                <svg
                  viewBox="0 0 10 10"
                  strokeWidth="3"
                  stroke={callback === 2 ? "hsl(192 78% 50%)" : "var(--purple)"}
                  width="20px"
                >
                  <line x1="5" y1="0" x2="5" y2="10" />
                  <line y1="5" x1="0" y2="5" x2="10" />
                </svg>
              </span>
            </span>
          </SimpleVar>
        )}
        {cleanup && (
          <span
            style={{
              fontSize: ".8em",
              position: "absolute",
              left: "275px",
              top: "0",
            }}
          >
            🦻
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "0",
              }}
            >
              <svg
                viewBox="0 0 10 10"
                strokeWidth="3"
                stroke={cleanup === 2 ? "hsl(192 78% 50%)" : "var(--purple)"}
                width="20px"
              >
                <line y1="5" x1="0" y2="5" x2="10" />
              </svg>
            </span>
          </span>
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
              viewBox="0 0 210 60"
              style={{
                width: "210px",
                height: "60px",
                position: "absolute",
                left: "130px",
                top: "30px",
                stroke: "currentColor",
                markerEnd: "url(#purple-down)",
                fill: "none",
              }}
            >
              <path d="M5,10 C110 10,120 3,120 45" strokeWidth="3" />
            </svg>
            ,{" "}
            <svg
              viewBox="0 0 280 100"
              style={{
                width: "280px",
                height: "100px",
                position: "absolute",
                left: "140px",
                top: "40px",
                stroke: "currentColor",
                markerEnd: "url(#purple-left)",
                fill: "none",
              }}
            >
              <path d="M20,5 C265 5,350 80,125 90" strokeWidth="3" />
            </svg>
            ]
          </div>
        )}
        {Array.isArray(deps) && (
          <div style={{ position: "absolute", top: "40px", width: "500px" }}>
            <SimpleVar
              name="deps"
              scope="hook"
              hideVarName={hideHookVars || hideDepsLabel}
            >
              [
              <span style={{ color: "var(--primary-colour)" }}>
                [<span style={{ fontSize: ".8em" }}>{deps.join()}</span>]
              </span>
              , <span style={{ fontSize: ".8em" }}>🔑</span>]
            </SimpleVar>
          </div>
        )}
      </div>

      {typeof needsCleanup !== "undefined" && (
        <div style={{ position: "absolute", top: "285px" }}>
          <SimpleVar name="needsCleanup" scope="hook" marginTop=".25em">
            <span style={{ fontSize: ".6em" }}>
              {needsCleanup ? "✅" : "❌"}
            </span>
          </SimpleVar>
        </div>
      )}

      {/* component props */}
      <div style={{ position: "absolute", top: "240px" }}>
        <div style={{ marginTop: ".5em", lineHeight: ".8" }}>
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
      </div>

      {Array.isArray(newDeps) && (
        <div style={{ position: "absolute", top: "250px", width: "500px" }}>
          <SimpleVar name="deps" scope="hook" hideVarName={hideDepsLabel}>
            [
            <span style={{ color: "var(--primary-colour)" }}>
              [<span style={{ fontSize: ".8em" }}>{newDeps.join()}</span>]
            </span>
            , <span style={{ fontSize: ".8em" }}>🔑</span>]
          </SimpleVar>
        </div>
      )}
    </div>
  )
}

function SimpleVar({
  name,
  scope,
  children,
  hideVarName,
  marginTop,
}: {
  name: string
  children: ReactNode
  scope?: "hook" | "component"
  hideVarName?: boolean
  marginTop?: string
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
        marginTop,
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
          <Vars currentIndex={0} up />
        </Fragment>
      </Slide>

      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,22|3-19" />
        <Vars currentIndex={0} items={["🍎", "🍇", "🍠"]} setItems up />
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
        <Vars
          currentIndex={0}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects={{ cb: true, deps: true }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="48" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects={{ cb: true, deps: true }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="21" />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          hideHookVars
          effects={{ cb: true, deps: true }}
        />
      </Slide>

      {/* after */}
      <Slide data-transition="none">
        <ReactCode highlightLines="5,25|6-11|6,11|7|27,32|28,30|29" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects={{ cb: true, deps: true }}
          hideHookVars
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="7|8,10|13-22|13,22|14,19|15-18|16" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects={{ cb: true, deps: true }}
          hideHookVars
          needsCleanup={false}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16|17" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects={{ cb: true, deps: true, prevDeps: true }}
          hideHookVars
          needsCleanup={false}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects={{ cb: true, deps: true, prevDeps: true }}
          hideHookVars
          needsCleanup={false}
          listening
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={1}
          callback
          deps={["🍎", "🍇", "🍠"]}
          effects={{ cb: true, deps: true, prevDeps: true, cleanup: true }}
          hideHookVars
          needsCleanup={false}
          listening
          cleanup
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="15-18|24" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={1}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true }}
          hideHookVars
          needsCleanup={false}
          listening
          cleanup
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="24" />
        <ComponentCode isBackground />
        <Vars
          currentIndex={0}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true }}
          hideHookVars
          needsCleanup={false}
          listening
          cleanup
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode isBackground />
        <Vars
          currentIndex={0}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true }}
          hideHookVars
          listening
          cleanup
        />
      </Slide>

      {/* keydown */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5-12|9-11" />
        <Vars
          currentIndex={0}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true }}
          hideHookVars
          listening
          cleanup
          up
          items={["🍎", "🍇", "🍠"]}
          setItems
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,22|3,19" />
        <Vars
          currentIndex={0}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true }}
          hideHookVars
          listening
          cleanup
          up
          items={["🍇", "🍠"]}
          setItems
        />
      </Slide>

      <Slide data-transition="none">
        <ReactCode highlightLines="37,49|38,40,46|41-45|42" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true }}
          callback={2}
          listening
          cleanup
          newDeps={["🍇", "🍠"]}
          hideDepsLabel
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="43,44|48" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true, deps: 2, cb: true }}
          callback={2}
          listening
          cleanup
          newDeps={["🍇", "🍠"]}
          hideDepsLabel
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="48" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true, deps: 2, cb: true }}
          callback={2}
          listening
          cleanup
          newDeps={["🍇", "🍠"]}
          hideDepsLabel
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="21" />
        <Vars
          currentIndex={1}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true, deps: 2, cb: true }}
          callback={2}
          listening
          cleanup
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5,25|6-11|7|27,32|28,30|31" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true, deps: 2, cb: true }}
          callback={2}
          listening
          cleanup
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="7|8,10|9" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true, deps: 2, cb: true }}
          callback={2}
          listening
          cleanup
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="9|13-22|14,19|15-18|16" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: true, cleanup: true, deps: 2, cb: true }}
          callback={2}
          cleanup
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          deps={["🍎", "🍇", "🍠"]}
          effects={{ prevDeps: 2, cleanup: true, deps: 2, cb: true }}
          callback={2}
          cleanup
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16|17" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          effects={{ prevDeps: 2, cleanup: true, deps: 2, cb: true }}
          callback={2}
          cleanup
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          effects={{ prevDeps: 2, cleanup: true, deps: 2, cb: true }}
          callback={2}
          cleanup
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
          listening={2}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17|15-18" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          effects={{ prevDeps: 2, cleanup: true, deps: 2, cb: true }}
          callback={2}
          cleanup={2}
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
          listening={2}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="17|15-18|24" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          effects={{ prevDeps: 2, cleanup: true }}
          cleanup={2}
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
          listening={2}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="24" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          effects={{ prevDeps: 2, cleanup: true }}
          cleanup={2}
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          needsCleanup
          listening={2}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="24" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          effects={{ prevDeps: 2, cleanup: true }}
          cleanup={2}
          newDeps={["🍇", "🍠"]}
          hideHookVars
          hideDepsLabel
          listening={2}
        />
      </Slide>
    </>
  )
}
