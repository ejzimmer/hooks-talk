import { FormEvent, useRef } from "react";

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
`;

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
}`;

type Props = {
  onSubmit: (value: string, count: string) => void;
  hideCount?: boolean;
};

export function AddItemForm({ onSubmit, hideCount }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLInputElement>(null);

  const handleAddItem = (event: FormEvent) => {
    event.preventDefault();
    if (!nameRef.current || !countRef.current) return;

    onSubmit(nameRef.current.value, countRef.current.value);
    nameRef.current.value = "";
    countRef.current.value = "";
  };

  return (
    <form onSubmit={handleAddItem}>
      <input ref={nameRef} />
      {!hideCount && (
        <input
          type="number"
          ref={countRef}
          onKeyDown={(event) => event.stopPropagation()}
        />
      )}
      <button>Add</button>
    </form>
  );
}
