import { ReactNode } from "react"
import { Code } from "../../helpers/Code"
import { Fragment, Slide } from "../../helpers/Slide"

const useMemoImplementationCode = `const FakeReact = () => {
  let currentIndex = 0;
  const memos = [];

  function after() {
    currentIndex = 0;
  }

  return {
    // ... useRef ...
    // ... useState ...
    // ... useEffect
    useMemo(calculateValue, deps) {
      const memo = memos[currentIndex];
      const needsUpdating =
        !memo?.deps ||
        memo.deps.some((dep, index) => dep !== deps[index]);

      if (needsUpdating) {
        memos[currentIndex] = {
          value: calculateValue(),
          deps,
        };
      }

      const returnValue = memos[currentIndex].value;
      currentIndex++;

      return returnValue;
    },
}
`

const memoisedCode = `function ItemList({ items, setItems }) {
  const [sortBy, setSortBy] = useState();

  const sortedItems = useMemo(
    () => sortBy ? 
      items.toSorted(sortFunction(sortBy)) : 
      items;
    }, 
    [sortBy, items]
  );

  useEffect(() => {...}, [sortedItems, items]);

  return (...);
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
      {useMemoImplementationCode}
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
      {memoisedCode}
    </Code>
  )
}

function MemoArray({
  currentIndex = 0,
  memo,
  deps,
  memoisedValue,
  needsUpdating,
  returnValue,
  itemsToShow,
  filterValue,
}: {
  currentIndex?: number
  memo?: {
    value: string
    deps: string[] | string
  }
  deps?: string[]
  memoisedValue?: string
  needsUpdating?: boolean
  returnValue?: string
  itemsToShow?: string
  filterValue?: string
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        maxWidth: "50%",
      }}
    >
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>currentIndex</code>➡️<code>{currentIndex}</code>
      </div>
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>memoisedValues</code>➡️
        <div style={{ display: "flex", maxWidth: "220px" }}>
          [
          {memo && (
            <>
              <code>value: {memo.value}</code>
              <code>deps: {memo.deps}</code>
            </>
          )}
          ]
        </div>
      </div>
      {deps && (
        <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
          <code style={{ color: "var(--hookVars)" }}>deps</code>➡️
          <code>[{deps.join(",")}]</code>
        </div>
      )}
      {memoisedValue && <code>memoisedValue: {memoisedValue}</code>}
      {typeof needsUpdating !== "undefined" && (
        <code>needsUpdating: {needsUpdating.toString()}</code>
      )}
      {returnValue && <code>returnValue: {returnValue}</code>}
      {itemsToShow && <code>itemsToShow: {itemsToShow}</code>}
      {filterValue && <code>filter: {filterValue}</code>}
    </div>
  )
}

function Vars({
  currentIndex,
  memos,
  up,
  items,
  sortBy,
  calculateValue,
  deps,
  memo,
  needsUpdating,
  returnValue,
  hideDepsLabel,
  sortedItems,
  hideComponentVarLabels,
}: {
  currentIndex: number
  memos?: any
  items?: Record<string, number>
  up?: boolean
  sortBy?: string
  calculateValue?: boolean
  deps?: boolean
  memo?: boolean | number
  needsUpdating?: boolean
  returnValue?: boolean
  hideDepsLabel?: boolean
  sortedItems?: boolean
  hideComponentVarLabels?: boolean
}) {
  return (
    <div
      style={{
        width: "435px",
        height: "470px",
        background: "hsl(0 0% 0% / .6)",
        position: "fixed",
        top: up ? 0 : "",
        bottom: up ? "" : 0,
        right: 0,
        fontFamily: "Courier",
        padding: ".5em",
        textAlign: "start",
      }}
    >
      <SimpleVar name="currentIndex">{currentIndex}</SimpleVar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: memos ? "-1.1em" : "-.3em",
          marginBottom: memos ? "-.2em" : ".5em",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          memos
          <svg
            viewBox="0 0 10 10"
            stroke="white"
            width="15px"
            style={{ markerEnd: "url(#white)" }}
          >
            <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
          </svg>
          <div
            style={{
              width: "10px",
              height: "80px",
              border: "4px solid",
              borderRight: "none",
              marginRight: ".1em",
            }}
          />
          {memos && (
            <div
              style={{
                fontSize: "100px",
                letterSpacing: "-.3em",
                marginLeft: memos ? "-.3em" : 0,
                marginTop: ".2em",
                display: "flex",
              }}
            >
              &#x7b;
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  fontSize: "20px",
                  letterSpacing: "normal",
                  marginLeft: ".6em",
                  marginRight: "-.9em",
                  marginTop: "30px",
                  height: "50px",
                  marginBottom: memos ? "-.8em" : 0,
                }}
              >
                <span style={{ opacity: memos.value ? 1 : 0 }}>
                  value:
                  <span style={{ fontSize: "1.2em" }}>
                    [<Items items={memos.value} />]
                  </span>
                </span>
                <span
                  style={{ opacity: memos.deps ? 1 : 0, position: "relative" }}
                >
                  deps:
                  {memos.deps === 2 ? (
                    <span style={{ fontSize: "1.2em" }}>
                      [{" "}
                      <svg
                        viewBox="0 0 40 115"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "60px",
                          width: "40px",
                          height: "115px",
                          markerEnd: "url(#white-down)",
                        }}
                      >
                        <path d="M20,15 L20,115" />
                      </svg>
                      ,{" "}
                      <svg
                        viewBox="0 0 40 60"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "90px",
                          width: "40px",
                          height: "60px",
                          markerEnd: "url(#white-down)",
                        }}
                      >
                        <path d="M20,15 L20,60" />
                      </svg>
                      ]
                    </span>
                  ) : (
                    <svg
                      viewBox="0 0 80 195"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="3"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "5px",
                        width: "80px",
                        height: "195px",
                        markerEnd: "url(#white-left)",
                      }}
                    >
                      <path d="M70,10 C75 175,75 175,0 175" />
                    </svg>
                  )}
                </span>
              </div>
              &#x7d;
            </div>
          )}
          <div
            style={{
              width: "10px",
              height: "80px",
              border: "4px solid",
              borderLeft: "none",
              marginLeft: ".1em",
            }}
          />
        </span>
        <div
          style={{
            fontSize: "100px",
            letterSpacing: "-.3em",
            marginTop: ".2em",
            display: "flex",
          }}
        ></div>
      </div>

      {/* component vars */}
      {items && (
        <SimpleVar
          name="items"
          scope="component"
          hideVarName={hideComponentVarLabels}
        >
          [<Items items={items} />]
        </SimpleVar>
      )}
      {typeof sortBy !== "undefined" && (
        <SimpleVar
          name="sortBy"
          scope="component"
          marginTop="-.3em"
          hideVarName={hideComponentVarLabels}
        >
          {sortBy}
        </SimpleVar>
      )}
      {sortedItems && (
        <div
          style={{
            color: "var(--primary-colour)",
            position: "relative",
            marginTop: "-.3em",
          }}
        >
          sortedItems
          <svg
            viewBox="0 0 100 210px"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              height: "210px",
              width: "100px",
              markerEnd: "url(#green-up)",
            }}
          >
            <path d="M3,180 C50 180, 50 180, 50 5" />
          </svg>
        </div>
      )}

      {/* hook vars */}
      {deps && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "var(--purple)",
            position: "relative",
          }}
        >
          <span style={{ opacity: hideDepsLabel ? 0 : 1 }}>
            deps
            <svg
              viewBox="0 0 10 10"
              stroke="currentColor"
              width="10px"
              style={{ markerEnd: "url(#purple)" }}
            >
              <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
            </svg>
          </span>
          [
          <svg
            viewBox="0 0 80 55"
            style={{
              width: "80px",
              height: "55px",
              position: "absolute",
              left: "130px",
              bottom: "20px",
              stroke: "currentColor",
              markerEnd: "url(#purple-up)",
              fill: "none",
            }}
          >
            <path d="M5,45 C70 45,70 45,70 0" strokeWidth="3" />
          </svg>
          ,{" "}
          <svg
            viewBox="0 0 130 90"
            style={{
              width: "130px",
              height: "90px",
              position: "absolute",
              left: "155px",
              bottom: "20px",
              stroke: "currentColor",
              markerEnd: "url(#purple-up)",
              fill: "none",
            }}
          >
            <path d="M10,80 C120 80,120 80,120 0" strokeWidth="3" />
          </svg>
          ]
        </div>
      )}
      {calculateValue && (
        <SimpleVar name="calculateValue" scope="hook" marginTop="-1em">
          <img
            alt="calculator"
            src="./calculator.png"
            style={{ width: "1em" }}
          />
        </SimpleVar>
      )}
      {memo === 2 ? (
        <div
          style={{
            color: "var(--purple)",
            position: "relative",
            marginTop: "-.3em",
          }}
        >
          memo
          <svg
            viewBox="0 0 200 270"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              height: "270px",
              width: "200px",
              markerEnd: "url(#purple-up)",
            }}
          >
            <path d="M0,235 C110 235, 110 235, 110 5" />
          </svg>
        </div>
      ) : (
        memo && (
          <SimpleVar name="memo" scope="hook" marginTop="-.3em">
            {memo}
          </SimpleVar>
        )
      )}
      {typeof needsUpdating !== "undefined" && (
        <SimpleVar name="needsUpdating" scope="hook" marginTop="-.3em">
          <span style={{ fontSize: ".6em" }}>
            {needsUpdating ? "✅" : "❌"}
          </span>
        </SimpleVar>
      )}
      {returnValue && (
        <div
          style={{
            color: "var(--purple)",
            position: "relative",
            marginTop: "-.3em",
          }}
        >
          returnValue
          <svg
            viewBox="0 0 100 390"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              height: "390px",
              width: "100px",
              markerEnd: "url(#purple-up)",
            }}
          >
            <path d="M0,360 C50 360, 50 360, 50 5" />
          </svg>
        </div>
      )}
    </div>
  )
}

function Items({ items }: { items: Record<string, number> }) {
  return (
    <>
      {Object.entries(items).map(([item, count]) => (
        <span style={{ position: "relative" }}>
          {item},
          <span
            style={{
              fontSize: ".65em",
              position: "absolute",
              top: "-10%",
              left: "50%",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {count}
          </span>
        </span>
      ))}
    </>
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

export function UseMemoImplementation() {
  return (
    <>
      {/* react setup */}
      <Slide data-transition="none">
        <ReactCode highlightLines="1-3,31" />
        <ComponentCode isBackground />
        <Fragment>
          <Vars currentIndex={0} up />
        </Fragment>
      </Slide>

      {/* initial render */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,15|2" />
        <Vars currentIndex={0} up items={{ "🍎": 3, "🍇": 12, "🍠": 7 }} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="2|4-10|5-8|9" />
        <Vars
          currentIndex={0}
          up
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
        />
      </Slide>

      {/* initial hook */}
      <Slide data-transition="none">
        <ReactCode highlightLines="13,30|14" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          calculateValue
          deps
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14|15-17|16|15-17" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          calculateValue
          deps
          memo
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="15-17|19,24|20-23|21" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          calculateValue
          deps
          memo
          needsUpdating
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="21|22" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          calculateValue
          deps
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 } }}
          memo
          needsUpdating
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="22|26" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          calculateValue
          deps
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: true }}
          memo
          needsUpdating
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26|27" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          calculateValue
          deps
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: true }}
          memo
          needsUpdating
          returnValue
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27|29" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          calculateValue
          deps
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: true }}
          memo
          needsUpdating
          returnValue
        />
      </Slide>

      {/* back in component */}
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="4-10" />
        <Vars
          up
          currentIndex={1}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          deps
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: true }}
          hideDepsLabel
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="4-10" />
        <Vars
          up
          currentIndex={1}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          hideDepsLabel
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="4-10|12|14" />
        <Vars
          up
          currentIndex={1}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          hideDepsLabel
          sortedItems
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode />
        <Vars
          up
          currentIndex={1}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          hideComponentVarLabels
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode />
        <Vars
          up
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          hideComponentVarLabels
        />
      </Slide>

      {/* re-render with no change */}
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="1,2,15|4-10" />
        <Vars
          up
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13,30|14" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          calculateValue
          deps
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14|15-17|16|17" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          memo={2}
          calculateValue
          deps
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="15-17|19,24|26" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          memo={2}
          needsUpdating={false}
          calculateValue
          deps
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26" />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          memo={2}
          needsUpdating={false}
          calculateValue
          deps
          returnValue
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27|29" />
        <ComponentCode />
        <Vars
          currentIndex={1}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          memo={2}
          needsUpdating={false}
          calculateValue
          deps
          returnValue
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="4,10|12|14" />
        <Vars
          currentIndex={1}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          sortBy=""
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          sortedItems
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode />
        <Vars
          currentIndex={0}
          items={{ "🍎": 3, "🍇": 12, "🍠": 7 }}
          memos={{ value: { "🍎": 3, "🍇": 12, "🍠": 7 }, deps: 2 }}
          hideComponentVarLabels
        />
      </Slide>

      {/* re-render due to re-sort */}
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode />
        <SortVars
          up
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍇": 12, "🍠": 7 },
            deps: [undefined, { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="1,2,15|4-10" />
        <SortVars
          up
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍇": 12, "🍠": 7 },
            deps: [undefined, { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13,30|14" />
        <ComponentCode />
        <SortVars
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍇": 12, "🍠": 7 },
            deps: [undefined, { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          calculateValue
          deps
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14|15-17|16|17" />
        <ComponentCode />
        <SortVars
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍇": 12, "🍠": 7 },
            deps: [undefined, { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          calculateValue
          deps
          memo
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="15-17|19,24|20-23|21" />
        <ComponentCode />
        <SortVars
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍇": 12, "🍠": 7 },
            deps: [undefined, { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          calculateValue
          deps
          memo
          needsUpdating
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="21|22" />
        <ComponentCode />
        <SortVars
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍠": 7, "🍇": 12 },
            deps: [undefined, { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          calculateValue
          deps
          memo
          needsUpdating
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="22|26" />
        <ComponentCode />
        <SortVars
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍠": 7, "🍇": 12 },
            deps: ["count", { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          calculateValue
          deps
          memo
          needsUpdating
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26" />
        <ComponentCode />
        <SortVars
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍠": 7, "🍇": 12 },
            deps: ["count", { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          calculateValue
          deps
          memo
          needsUpdating
          returnValue
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27|29" />
        <ComponentCode />
        <SortVars
          currentIndex={1}
          memos={{
            value: { "🍎": 3, "🍠": 7, "🍇": 12 },
            deps: ["count", { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          calculateValue
          deps
          memo
          needsUpdating
          returnValue
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode highlightLines="4-10|12|14" />
        <SortVars
          currentIndex={1}
          memos={{
            value: { "🍎": 3, "🍠": 7, "🍇": 12 },
            deps: ["count", { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          sortBy="'count'"
          items
          sortedItems
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode />
        <ComponentCode />
        <SortVars
          currentIndex={0}
          memos={{
            value: { "🍎": 3, "🍠": 7, "🍇": 12 },
            deps: ["count", { "🍎": 3, "🍇": 12, "🍠": 7 }],
          }}
          inlineDeps
        />
      </Slide>
    </>
  )
}

function SortVars({
  currentIndex,
  memos,
  up,
  items,
  sortBy,
  hideComponentVarLabels,
  calculateValue,
  deps,
  hideDepsLabel,
  memo,
  needsUpdating,
  returnValue,
  sortedItems,
  inlineDeps,
}: {
  currentIndex: number
  memos?: any
  up?: boolean
  items?: boolean
  sortBy?: string
  hideComponentVarLabels?: boolean
  calculateValue?: boolean
  deps?: boolean
  hideDepsLabel?: boolean
  memo?: boolean
  needsUpdating?: boolean
  returnValue?: boolean
  sortedItems?: boolean
  inlineDeps?: boolean
}) {
  return (
    <div
      style={{
        width: "435px",
        height: "470px",
        background: "hsl(0 0% 0% / .6)",
        position: "fixed",
        top: up ? 0 : "",
        bottom: up ? "" : 0,
        right: 0,
        fontFamily: "Courier",
        padding: ".5em",
        textAlign: "start",
      }}
    >
      <SimpleVar name="currentIndex">{currentIndex}</SimpleVar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: memos ? "-1.1em" : "-.3em",
          marginBottom: memos ? "-.2em" : ".5em",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          memos
          <svg
            viewBox="0 0 10 10"
            stroke="white"
            width="15px"
            style={{ markerEnd: "url(#white)" }}
          >
            <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
          </svg>
          <div
            style={{
              width: "10px",
              height: "80px",
              border: "4px solid",
              borderRight: "none",
              marginRight: ".1em",
            }}
          />
          {memos && (
            <div
              style={{
                fontSize: "100px",
                letterSpacing: "-.3em",
                marginLeft: memos ? "-.3em" : 0,
                marginTop: ".2em",
                display: "flex",
              }}
            >
              &#x7b;
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  fontSize: "20px",
                  letterSpacing: "normal",
                  marginLeft: ".6em",
                  marginRight: "-.9em",
                  marginTop: "30px",
                  height: "50px",
                  marginBottom: memos ? "-.8em" : 0,
                }}
              >
                <span style={{ opacity: memos.value ? 1 : 0 }}>
                  value:
                  <span style={{ fontSize: "1.2em" }}>
                    [<Items items={memos.value} />]
                  </span>
                </span>
                <span
                  style={{ opacity: memos.deps ? 1 : 0, position: "relative" }}
                >
                  deps:
                  <span style={{ fontSize: "1.2em", position: "relative" }}>
                    [
                    {memos.deps[0] === "count" ? (
                      <>
                        {inlineDeps ? (
                          <>
                            "'count'"
                            <br />
                          </>
                        ) : (
                          <>
                            {" "}
                            <svg
                              viewBox="0 0 100 100"
                              stroke="currentColor"
                              strokeWidth="3"
                              markerEnd="url(#white-down)"
                              style={{
                                position: "absolute",
                                left: 0,
                                width: "100px",
                                height: "100px",
                              }}
                            >
                              <line x1="22" y1="10" x2="22" y2="95" />
                            </svg>
                          </>
                        )}
                      </>
                    ) : (
                      " "
                    )}
                    ,
                    <span style={{ marginRight: "-.3em", marginLeft: "-.3em" }}>
                      [
                    </span>
                    <Items items={memos.deps[1]} />
                    <span style={{ marginLeft: "-.3em" }}>]</span>
                    <span style={{ marginLeft: "-.3em" }}>]</span>
                  </span>
                </span>
              </div>
              &#x7d;
            </div>
          )}
          <div
            style={{
              width: "10px",
              height: "80px",
              border: "4px solid",
              borderLeft: "none",
              marginLeft: ".1em",
            }}
          />
        </span>
        <div
          style={{
            fontSize: "100px",
            letterSpacing: "-.3em",
            marginTop: ".2em",
            display: "flex",
          }}
        ></div>
      </div>

      {/* component vars */}
      {items && (
        <div
          style={{
            color: "var(--primary-colour)",
            position: "relative",
            marginTop: "-.5em",
          }}
        >
          items
          <svg
            viewBox="0 0 300 90"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              width: "300px",
              height: "90px",
              markerEnd: "url(#green-up)",
            }}
          >
            <path d="M0,60 C210 60, 210 60,210 15" />
          </svg>
        </div>
      )}
      {typeof sortBy !== "undefined" && (
        <SimpleVar
          name="sortBy"
          scope="component"
          marginTop="-.3em"
          hideVarName={hideComponentVarLabels}
        >
          {sortBy}
        </SimpleVar>
      )}
      {sortedItems && (
        <div
          style={{
            color: "var(--primary-colour)",
            position: "relative",
            marginTop: "-.3em",
          }}
        >
          sortedItems
          <svg
            viewBox="0 0 100 210px"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              height: "210px",
              width: "100px",
              markerEnd: "url(#green-up)",
            }}
          >
            <path d="M3,180 C50 180, 50 180, 50 20" />
          </svg>
        </div>
      )}

      {/* hook vars */}
      {deps && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "var(--purple)",
            position: "relative",
          }}
        >
          <span style={{ opacity: hideDepsLabel ? 0 : 1 }}>
            deps
            <svg
              viewBox="0 0 10 10"
              stroke="currentColor"
              width="10px"
              style={{ markerEnd: "url(#purple)" }}
            >
              <line x1="0" y1="5" x2="10" y2="5" strokeWidth="2" />
            </svg>
          </span>
          [
          <svg
            viewBox="0 0 150 55"
            style={{
              width: "150px",
              height: "55px",
              position: "absolute",
              left: "130px",
              bottom: "20px",
              stroke: "currentColor",
              markerEnd: "url(#purple-up)",
              fill: "none",
            }}
          >
            <path d="M5,45 C120 45,120 45,120 0" strokeWidth="3" />
          </svg>
          ,{" "}
          <svg
            viewBox="0 0 180 150"
            style={{
              width: "180px",
              height: "150px",
              position: "absolute",
              left: "155px",
              bottom: "20px",
              stroke: "currentColor",
              markerEnd: "url(#purple-up)",
              fill: "none",
            }}
          >
            <path d="M10,140 C120 140,160 80,160 0" strokeWidth="3" />
          </svg>
          ]
        </div>
      )}
      {calculateValue && (
        <SimpleVar name="calculateValue" scope="hook" marginTop="-1em">
          <img
            alt="calculator"
            src="./calculator.png"
            style={{ width: "1em" }}
          />
        </SimpleVar>
      )}
      {memo && (
        <div
          style={{
            color: "var(--purple)",
            position: "relative",
            marginTop: "-.3em",
          }}
        >
          memo
          <svg
            viewBox="0 0 200 270"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              height: "270px",
              width: "200px",
              markerEnd: "url(#purple-up)",
            }}
          >
            <path d="M0,235 C110 235, 110 235, 110 20" />
          </svg>
        </div>
      )}
      {typeof needsUpdating !== "undefined" && (
        <SimpleVar name="needsUpdating" scope="hook" marginTop="-.3em">
          <span style={{ fontSize: ".6em" }}>
            {needsUpdating ? "✅" : "❌"}
          </span>
        </SimpleVar>
      )}
      {returnValue && (
        <div
          style={{
            color: "var(--purple)",
            position: "relative",
            marginTop: "-.3em",
          }}
        >
          returnValue
          <svg
            viewBox="0 0 100 390"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              height: "390px",
              width: "100px",
              markerEnd: "url(#purple-up)",
            }}
          >
            <path d="M0,360 C50 360, 50 360, 50 15" />
          </svg>
        </div>
      )}
    </div>
  )
}
