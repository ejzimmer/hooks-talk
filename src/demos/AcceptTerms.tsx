import { useRef, useState } from "react"

type Props = {
  onSubmit: (subscribe?: boolean) => void
}

export const acceptTermsCode = `export function AcceptTerms({ onSubmit }: Props) {
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
}`

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

export const abridgedAcceptTermsAndSpamCode = `// our component
export function AcceptTermsAndSpam({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const subscribeRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (termsRef.current?.checked) {
      onSubmit({ subscribe: !!subscribeRef.current?.checked })
    }
  }

  return (...)
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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
    >
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <label>
        <input type="checkbox" ref={subscribeRef} />
        Can we send you spam?
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export const acceptTermsWithErrorMessageCode = `export function AcceptTerms({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!termsRef.current?.checked) {
      setError("Please accept the terms")
    } else {
      onSubmit()
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <div className="error">{error}</div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}`

export function AcceptTermsWithErrorMessages({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!termsRef.current?.checked) {
      setError("Please accept the terms")
    } else {
      setError("")
      onSubmit()
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <div style={{ color: "red" }}>{error}</div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export const acceptTermsWithErrorNoStateCode = `export function AcceptTerms({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<string>()

  const handleSubmit = () => {
    if (!termsRef.current?.checked)  
      errorRef.current = "Please accept the terms";
    else 
      onSubmit()
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <div className="error">{errorRef.current}</div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}`

export function AcceptTermsWithErrorMessagesNoState({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<string>()

  const handleSubmit = () => {
    if (!termsRef.current?.checked) {
      errorRef.current = "Please accept the terms"
    } else {
      onSubmit()
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} />
        Do you accept the terms & conditions?
      </label>
      <div className="error">{errorRef.current}</div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export const onSubmit = (subscribe?: boolean) => {
  const message = `Thank you for your submission.${
    subscribe ? " You have been subscribed to our newsletter." : ""
  }`
  alert(message)
}

export function AcceptTermsWithDisappearingErrorMessages({ onSubmit }: Props) {
  const termsRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!termsRef.current?.checked) {
      setError("Please accept the terms")
    } else {
      setError("")
      onSubmit()
    }
  }

  const handleClick = () => {
    if (termsRef.current?.checked) {
      setError("")
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} onClick={handleClick} />
        Do you accept the terms & conditions?
      </label>
      <div style={{ color: "red" }}>{error}</div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export const disappearingErrorMessageCode = `export function AcceptTerms({ onSubmit }: Props) {
  ...
  
  const handleClick = () => {
    if (termsRef.current?.checked) {
      setError("")
    }
  }

  return (
    <>
      <label>
        <input type="checkbox" ref={termsRef} onClick={handleClick} />
        Do you accept the terms & conditions?
      </label>
      <div style={{ color: "red" }}>{error}</div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}`
