import { Code } from "../../helpers/Code";
import { Fragment, Slide } from "../../helpers/Slide";

const useEffectImplementationCode = `const React = () => {
  let currentIndex = 0
  let effects = []

  function after() {
    effects.forEach((effect) => {
      const needsCleanup = dependenciesChanged(effect) || componentUnmounting()
      if (needsCleanup && effect.cleanup) {
        effect.cleanup()
      }
    })

    if (!componentUnmounting()) {
      effects = effects.map((effect) => {
        if (!effect.deps || !effect.prevDeps || dependenciesChanged(effect)) {
          return {
            prevDeps: effect.deps,
            cleanup: effect.callback(),
          }
        }
  
        return effect
      })
    }

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
`;

export const keyboardShortcutCode = `function ItemList({ items }: Props) {
  const [itemsToShow, setItemsToShow] = useState(items)

  ...sort & filter code...

  useEffect(
    () => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (!event.key.match(/^[0-9]$/)) return
        const indexToUpdate = Number.parseInt(event.key) - 1
        const itemToUpdate = itemsToShow[indexToUpdate]
        setItemsToShow(
          itemsToShow.map((i) => (i === item ? { ...i, count: --i.count } : i))
        )
      }

      window.addEventListener("keydown", onKeyDown)

      return () => window.removeEventListener("keydown", onKeyDown)
    }, 
    [itemsToShow]
  )

  return (...)
}
`;

function ReactCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string;
  isBackground?: boolean;
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      className={isBackground ? "background" : ""}
      isTwoUp
    >
      {useEffectImplementationCode}
    </Code>
  );
}

function ComponentCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string;
  isBackground?: boolean;
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      className={isBackground ? "background" : ""}
      isTwoUp
    >
      {keyboardShortcutCode}
    </Code>
  );
}

function EffectArray({
  currentIndex = 0,
  value,
  isListening,
  itemsToShow,
  deps,
}: {
  currentIndex?: number;
  value?: {
    deps?: string[] | string;
    prevDeps?: string[];
    callback?: string;
    cleanup?: string;
  };
  isListening?: boolean;
  itemsToShow?: string[] | string;
  deps?: string[];
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      {isListening && (
        <div style={{ position: "absolute", top: 0, right: 0 }}>🦻</div>
      )}
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>currentIndex</code>➡️<code>{currentIndex}</code>
      </div>
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>effects</code>➡️
        <div style={{ display: "flex", maxWidth: "220px" }}>
          {value && [
            <div style={{}}>
              [{value.callback && <div>callback: {value.callback}</div>}
              {value.prevDeps && (
                <div>prevDeps: [[{value.prevDeps.join(", ")}]]</div>
              )}
              {value.cleanup && <div>cleanup: {value.cleanup}</div>}
              {value.deps && (
                <div>
                  deps: [
                  {Array.isArray(value.deps)
                    ? `[${value.deps.join(", ")}]`
                    : value.deps}
                  ]
                </div>
              )}
              ]
            </div>,
          ]}
        </div>
      </div>
      {itemsToShow && (
        <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
          <code style={{ color: "var(--primary-colour)" }}>itemsToShow</code>
          {Array.isArray(itemsToShow) ? (
            <>
              ➡️<code>[{itemsToShow.join(",")}]</code>
            </>
          ) : (
            itemsToShow
          )}
        </div>
      )}
      {deps && (
        <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
          <code style={{ color: "var(--hookVars)" }}>deps</code>➡️
          <code>[{deps.join(",")}]</code>
        </div>
      )}
    </div>
  );
}

export function UseEffectImplementation() {
  return (
    <>
      {/* intro slide */}
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
        <ReactCode highlightLines="1-3,53" />
        <ComponentCode isBackground />
        <Fragment>
          <EffectArray currentIndex={0} value={{}} />
        </Fragment>
      </Slide>

      {/* initial render */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,2,4,25" />
        <EffectArray currentIndex={0} value={{}} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="6-22" />
        <EffectArray
          currentIndex={0}
          value={{}}
          itemsToShow={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="39,48|40|41" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray currentIndex={0} value={{}} deps={["🍎", "🍍", "🦄"]} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="41" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={0}
          value={{ callback: "🦻+", deps: "⬇️" }}
          deps={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="50" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={0}
          value={{ callback: "🦻+", deps: "⬇️" }}
          deps={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="50" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={1}
          value={{ callback: "🦻+", deps: "⬇️" }}
          deps={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="6,22|24" />
        <EffectArray
          currentIndex={1}
          value={{ callback: "🦻+", deps: ["🍎", "🍍", "🦄"] }}
          itemsToShow={"⬆️"}
        />
      </Slide>

      {/* after */}
      <Slide data-transition="none">
        <ReactCode highlightLines="5,27|6,11|7|29,34|30,32|31|7|8,10|13,24|14,23|15,20|16-19|18" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{ callback: "🦻+", deps: ["🍎", "🍍", "🦄"] }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="18|16-19|14" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{ callback: "🦻+", deps: ["🍎", "🍍", "🦄"] }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>

      <Slide data-transition="none">
        parent re-rendered
        <ReactCode isBackground />
        <ComponentCode highlightLines="1-4,25|6-22" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
          }}
          isListening
          itemsToShow={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        parent re-rendered
        <ReactCode highlightLines="39,40,51|43-47" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
          }}
          isListening
          deps={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        parent re-rendered
        <ReactCode highlightLines="43-47|50" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: "⬇️",
          }}
          isListening
          deps={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        parent re-rendered
        <ReactCode highlightLines="50" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: "⬇️",
          }}
          isListening
          deps={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        parent re-rendered
        <ReactCode isBackground />
        <ComponentCode highlightLines="6-22|24" />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        parent re-rendered
        <ReactCode highlightLines="5,27|6,11|7|29,34|30,32|33|7|8,10|13,24|14,23|15,20|22|26" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        parent re-rendered
        <ReactCode highlightLines="26" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        parent re-rendered
        <ReactCode isBackground />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
        />
      </Slide>

      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode isBackground />
        <ComponentCode highlightLines="8-15|12-14" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
          itemsToShow={["🍎", "🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode isBackground />
        <ComponentCode highlightLines="12-14|1-4,25" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
          itemsToShow={["🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode isBackground />
        <ComponentCode highlightLines="6-22" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
          itemsToShow={["🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="39,51|40|43-47" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍎", "🍍", "🦄"],
          }}
          isListening
          deps={["🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="43-47|50" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: "⬇️",
          }}
          isListening
          deps={["🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="50" />
        <ComponentCode highlightLines="6,22" />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: "⬇️",
          }}
          isListening
          deps={["🍍", "🦄"]}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode isBackground />
        <ComponentCode highlightLines="24" />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="5,27|6,11|7|8,10|9" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍍", "🦄"],
          }}
          isListening
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="9" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍍", "🦄"],
          }}
          isListening={false}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="13,24|14,23|15,20|16-19|17" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍎", "🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍍", "🦄"],
          }}
          isListening={false}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="17|18" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍍", "🦄"],
          }}
          isListening={false}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="18" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍍", "🦄"],
            callback: "🦻+",
            deps: ["🍍", "🦄"],
          }}
          isListening={true}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="18|26" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={1}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍍", "🦄"],
          }}
          isListening={true}
        />
      </Slide>
      <Slide data-transition="none">
        onKeyDown fired
        <ReactCode highlightLines="18|26" />
        <ComponentCode isBackground />
        <EffectArray
          currentIndex={0}
          value={{
            cleanup: "🦻❌",
            prevDeps: ["🍍", "🦄"],
          }}
          isListening={true}
        />
      </Slide>
    </>
  );
}
