import { FormEvent, MutableRefObject, forwardRef, useRef } from "react"

export const addItemFormCode = `function AddItemForm({ onSubmit }: Props) {
  const nameRef = useRef(null);

  const handleAddItem = (event) => {
    event.preventDefault();
    onSubmit(nameRef.current?.value);
  }

  return (
    <form onSubmit={handleAddItem}>
      <input ref={nameRef} />
      <button>Add</button>
    </form>
  );
}
`

export const addItemFormWithCountCode = `function AddItemForm({ onSubmit }: Props) {
  const countRef = useRef(null)
  const nameRef = useRef(null)

  const handleAddItem = (event) => {
    event.preventDefault()
    onSubmit(nameRef.current?.value, countRef.current?.value)
  }

  return (
    <form onSubmit={handleAddItem}>
      <input type="number" ref={countRef} />
      <input ref={nameRef} />
      <button>Add</button>
    </form>
  )
}`

type Props = {
  onSubmit: (value: string, count?: string) => void
  hideCount?: boolean
}

export function AddItemForm({ onSubmit, hideCount }: Props) {
  const nameRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<HTMLInputElement>(null)

  const handleAddItem = (event: FormEvent) => {
    event.preventDefault()
    if (!nameRef.current || (!hideCount && !countRef.current)) return

    onSubmit(nameRef.current.value, countRef.current?.value)
    nameRef.current.value = ""

    if (countRef.current) {
      countRef.current.value = ""
      countRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleAddItem}>
      {!hideCount && <CountInput ref={countRef} />}
      <input ref={nameRef} />
      <button>Add</button>
    </form>
  )
}

const CountInput = forwardRef<HTMLInputElement>(function CountInput(_, ref) {
  const handleClick = (delta: number) => {
    const input = (ref as MutableRefObject<HTMLInputElement>)?.current
    const value = Number.parseInt(input.value || "0")
    input.value = `${value + delta}`
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr min-content",
      }}
      className="input-wrapper"
    >
      <input
        pattern="[0-9]+"
        size={2}
        ref={ref}
        onKeyDown={(event) => event.stopPropagation()}
        style={{
          gridRow: "span 2",
          borderRight: "2px solid",
          borderImage:
            "linear-gradient(transparent, var(--primary-colour), transparent)",
          borderImageSlice: 1,
        }}
      />
      <button
        type="button"
        onClick={() => handleClick(1)}
        tabIndex={-1}
        style={{
          borderBottom: "2px solid",
          borderImage:
            "linear-gradient(to right, var(--primary-colour), transparent)",
          borderImageSlice: 1,
        }}
      >
        +
      </button>
      <button tabIndex={-1} type="button" onClick={() => handleClick(-1)}>
        -
      </button>
    </div>
  )
})
