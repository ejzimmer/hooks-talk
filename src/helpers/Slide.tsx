import { ElementType, PropsWithChildren } from "react"

export function Slide({ children }: PropsWithChildren<any>) {
  return <section>{children}</section>
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
