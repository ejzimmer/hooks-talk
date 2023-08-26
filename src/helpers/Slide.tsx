import { PropsWithChildren } from "react"

export function Slide({ children }: PropsWithChildren<any>) {
  return <section>{children}</section>
}

// idk. Reveal increments the fragment index by 2 for some reason, probably to do
// with re-rendering
export function Fragment({ children }: PropsWithChildren<any>) {
  return (
    <>
      <div className="fragment">{children}</div>
      <div className="fragment"></div>
    </>
  )
}
