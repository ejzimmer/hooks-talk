import { PropsWithChildren } from "react"
import { Slide } from "../../helpers/Slide"

type Props = {
  highlighted: number
}

export function FunctionalComponentProblems({ highlighted }: Props) {
  return (
    <Slide>
      <h2>Some problems with functional components</h2>
      <ol className="r-fit-text">
        <HighlightListItem isHighlighted={highlighted === 0}>
          They can't store state
        </HighlightListItem>
        <HighlightListItem isHighlighted={highlighted === 1}>
          They can't trigger re-renders
        </HighlightListItem>
      </ol>
    </Slide>
  )
}

export function HighlightListItem({
  children,
}: PropsWithChildren<{ isHighlighted: boolean }>) {
  return <li>{children}</li>
}
