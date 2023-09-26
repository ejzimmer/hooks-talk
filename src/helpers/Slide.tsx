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
    <Slide
      data-background-image="chest.png"
      data-background-size="50%"
      data-background-position="center 75%"
      data-transition="slide-up"
    >
      <h2>{title}</h2>
    </Slide>
  )
}

export function InverseTitle({ children }: PropsWithChildren<any>) {
  return (
    <Slide
      data-background="linear-gradient(var(--primary-colour), #00acd8)"
      data-transition="fade"
    >
      <div className="inverse">{children}</div>
    </Slide>
  )
}

type Props = {
  as?: ElementType
  className?: string
  index?: number
  style?: any
}

export function Fragment({
  as = "div",
  className,
  index,
  style,
  children,
}: PropsWithChildren<Props>) {
  const As = as
  return (
    <As
      className={"fragment " + className}
      data-fragment-index={index}
      style={style}
    >
      {children}
    </As>
  )
}

export function Notes({ children }: PropsWithChildren<any>) {
  return <aside className="notes">{children}</aside>
}
