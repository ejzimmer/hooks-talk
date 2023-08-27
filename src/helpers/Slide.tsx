import {
  ElementType,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react"

export function Slide({
  renderOnVisible,
  children,
}: PropsWithChildren<{ renderOnVisible?: boolean }>) {
  const ref = useRef<HTMLElement>(null)
  const [showChildren, setShowChildren] = useState(!renderOnVisible)

  useEffect(() => {
    if (!ref.current || !renderOnVisible) return

    ref.current.addEventListener("transitionend", () => {
      const elementIsVisible = ref.current?.classList.contains("present")
      setShowChildren(!!elementIsVisible)
    })
  }, [renderOnVisible])

  return <section ref={ref}>{showChildren && children}</section>
}

export function ShinyTitle({ title }: { title: string }) {
  return (
    <Slide>
      <h2>{title}</h2>
    </Slide>
  )
}

export function InverseTitle({ children }: PropsWithChildren<any>) {
  return (
    <Slide>
      <h2>{children}</h2>
    </Slide>
  )
}

type Props = {
  as?: ElementType
}

export function Fragment({ as = "div", children }: PropsWithChildren<Props>) {
  const As = as
  return <As className="fragment">{children}</As>
}

export function Notes({ children }: PropsWithChildren<any>) {
  return <aside className="notes">{children}</aside>
}
