import {
  ElementType,
  PropsWithChildren,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react"

export const Slide = forwardRef<
  HTMLElement,
  PropsWithChildren<{ renderOnVisible?: boolean }>
>(function Slide({ renderOnVisible, children, ...data }, externalRef) {
  const internalRef = useRef<HTMLElement>(null)
  const ref = (externalRef || internalRef) as RefObject<HTMLElement>
  const [showChildren, setShowChildren] = useState(!renderOnVisible)

  useEffect(() => {
    if (!ref.current || !renderOnVisible) return

    ref.current.addEventListener("transitionend", () => {
      const elementIsVisible = ref.current?.classList.contains("present")
      setShowChildren(!!elementIsVisible)
    })
  }, [renderOnVisible, ref])

  return (
    <section ref={ref} {...data}>
      {showChildren && children}
    </section>
  )
})

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
