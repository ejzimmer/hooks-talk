import { useRef, useState } from "react"

export const renderCounterCode = `export function RenderCounter() {
  const numberOfRenders = useRef(0)

  numberOfRenders.current = numberOfRenders.current + 1

  return (
    <div>
      This component has rendered 
      {numberOfRenders.current} times
    </div>
  );
}
`

export const abridgedRenderCounterCode = `// in our code
export function RenderCounter() {
  const numberOfRenders = useRef(0)

  numberOfRenders.current = numberOfRenders.current + 1

  return (...);
}
`

export const abridgedRenderCounterCodeWithoutCurrent = `// in our code
export function RenderCounter() {
  const numberOfRenders = useRef(0)

  numberOfRenders = numberOfRenders + 1

  return (...);
}
`

export function RenderCounterWithRerender() {
  const [, setRerender] = useState(false)

  return (
    <>
      <button onClick={() => setRerender((rerender) => !rerender)}>
        Trigger rerender
      </button>
      <RenderCounter />
    </>
  )
}

export function RenderCounter() {
  const numberOfRenders = useRef(0)

  numberOfRenders.current = numberOfRenders.current + 1

  return <div>This component has rendered {numberOfRenders.current} times</div>
}

export function BrokenRenderCounterWithRerender() {
  const [, setRerender] = useState(false)

  return (
    <>
      <button onClick={() => setRerender((rerender) => !rerender)}>
        Click to rerender
      </button>
      <BrokenRenderCounter />
    </>
  )
}
export function BrokenRenderCounter() {
  let numberOfRenders = 0

  numberOfRenders++

  return <div>This component has rendered {numberOfRenders} times</div>
}
