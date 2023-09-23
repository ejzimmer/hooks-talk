import { FormEvent, useRef } from "react"

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
      {!hideCount && (
        <input
          type="number"
          ref={countRef}
          onKeyDown={(event) => event.stopPropagation()}
        />
      )}
      <input ref={nameRef} />
      <button>Add</button>
    </form>
  )
}
