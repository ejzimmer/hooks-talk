import { forwardRef } from "react"

type Props = {
  fontSize?: string
  children: string
  highlightLines?: string
}

export const Code = forwardRef<HTMLElement, Props>(function Code(
  { highlightLines, fontSize, children },
  ref
) {
  return (
    <pre style={{ fontSize }}>
      <code className="tsx" data-line-numbers={highlightLines} ref={ref}>
        {children}
      </code>
    </pre>
  )
})
