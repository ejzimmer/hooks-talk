import { Code } from "../../helpers/Code"
import { Fragment, Slide } from "../../helpers/Slide"

const useEffectImplementationCode = `const React = () => {
  let currentIndex = 0
  const effects = []

  function useEffect(callback, deps) {
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

  function after() {
    cleanup()

    if (!componentUnmounting()) {
      update()
    }

    currentIndex = 0;
  }

  function cleanup() {
    effects.forEach((effect) => {
      const needsCleanup = dependenciesChanged(effect) || componentUnmounting()
      if (needsCleanup && effect.cleanup) {
        effect.cleanup()
      }
    })
  }
  function update() {
    effects.map((effect) => {
      if (dependenciesChanged(effect)) {
        return {
          prevDeps: effect.deps,
          cleanup: effect.callback(),
        }
      }

      return effect
    })
  }

  function dependenciesChanged(effect: { deps: any[]; prevDeps?: any[] }) {
    return effect.deps.some((dep, index) => dep !== effect.prevDeps?.[index])
  }
}
`

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
      className={className}
      isTwoUp
    >
      {useEffectImplementationCode}
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
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      className={className}
      isTwoUp
    >
      {keyboardShortcutCode}
    </Code>
  )
}

function EffectArray({
  currentIndex = 0,
  value,
}: {
  currentIndex?: number
  value?: {
    deps?: string[]
    prevDeps?: string[]
    callback?: string
    cleanup?: string
  }
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
        <code>effects</code>➡️
        <div style={{ display: "flex", maxWidth: "220px" }}>
          {value && [
            <div style={{}}>
              [{value.callback && <div>{value.callback}</div>}
              {value.deps && <div>[{value.deps.join(", ")}]</div>}
              {value.prevDeps && <div>[{value.prevDeps.join(", ")}]</div>}
              {value.cleanup && <div>{value.cleanup}</div>}]
            </div>,
          ]}
        </div>
      </div>
    </div>
  )
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
        <ComponentCode className="background" />
        <Fragment>
          <EffectArray currentIndex={0} value={{}} />
        </Fragment>
      </Slide>

      {/* initial render */}
      <Slide data-transition="none">
        <ReactCode className="background" />
        <ComponentCode highlightLines="1,2,4,25|6-22" />
        <EffectArray currentIndex={0} value={{}} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5,17|6|7" />
        <ComponentCode className="background" />
        <EffectArray currentIndex={0} value={{}} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5,17|6|7" />
        <ComponentCode className="background" />
        <EffectArray
          currentIndex={0}
          value={{ callback: "addKeyDownHandler", deps: ["sortedItems"] }}
        />
      </Slide>
    </>
  )
}
