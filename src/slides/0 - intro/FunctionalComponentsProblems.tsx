import { PropsWithChildren } from "react"
import { Slide } from "../../helpers/Slide"

type Props = {
  highlighted: number
}

export function FunctionalComponentProblems({ highlighted }: Props) {
  return (
    <Slide>
      <h2>Some problems with functional components</h2>
      <ol>
        <HighlightListItem isHighlighted={highlighted === 0}>
          They can't store state
        </HighlightListItem>
      </ol>
    </Slide>
  )
}

export function HighlightListItem({
  isHighlighted,
  children,
}: PropsWithChildren<{ isHighlighted: boolean }>) {
  return (
    <li style={{ fontWeight: isHighlighted ? "bold" : "inherit" }}>
      {children}
    </li>
  )
}
