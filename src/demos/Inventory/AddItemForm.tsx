import { FormEvent, useRef } from "react"

export const addItemFormCode = `function AddItemForm({ onSubmit }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);

  const handleAddItem = (event: FormEvent) => {
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
  const nameRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<HTMLInputElement>(null)

  const handleAddItem = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(nameRef.current?.value, countRef.current?.value)
  }

  return (
    <form onSubmit={handleAddItem}>
      <input ref={nameRef} />
      <input type="number" ref={countRef} />
      <button>Add</button>
    </form>
  )
}`

type Props = {
  onSubmit: (value?: string, count?: string) => void
  showCount?: boolean
}

export function AddItemForm({ onSubmit, showCount: showNumber }: Props) {
  const nameRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<HTMLInputElement>(null)

  const handleAddItem = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(nameRef.current?.value, countRef.current?.value)
  }

  return (
    <form onSubmit={handleAddItem}>
      <input ref={nameRef} />
      {showNumber && <input type="number" ref={countRef} />}
      <button>Add</button>
    </form>
  )
}
