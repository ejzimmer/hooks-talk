import { useRef } from "react"

type Props = {
  onSubmit: (subscribe?: boolean) => void
}

export const acceptTermsCode = `
export function AcceptTerms({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (termsRef.current?.checked) {
      onSubmit()
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
`

export function AcceptTerms({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (termsRef.current?.checked) {
      onSubmit()
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export const acceptTermsAndSpamCode = `export function AcceptTermsAndSpam({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const subscribeRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (termsRef.current?.checked) {
      onSubmit({ subscribe: !!subscribeRef.current?.checked })
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <label>
        <input type="checkbox" ref={subscribeRef} />
        Can we send you spam?
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}`

export function AcceptTermsAndSpam({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const subscribeRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (termsRef.current?.checked) {
      onSubmit(!!subscribeRef.current?.checked)
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <label>
        <input type="checkbox" ref={subscribeRef} />
        Can we send you spam?
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
