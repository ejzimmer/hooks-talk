import { forwardRef } from "react"

type Props = {
  fontSize?: string
  children: string
  highlightLines?: string
  transparent?: boolean
}

export const Code = forwardRef<HTMLElement, Props>(function Code(
  { highlightLines, fontSize, transparent, children },
  ref
) {
  return (
    <pre
      style={{
        fontSize: transparent ? "inherit" : fontSize,
        margin: transparent ? 0 : undefined,
        backgroundColor: transparent ? "transparent" : undefined,
        boxShadow: transparent ? "none" : undefined,
      }}
    >
      <code
        className="tsx"
        style={{ backgroundColor: transparent ? "transparent" : undefined }}
        data-line-numbers={highlightLines}
        ref={ref}
      >
        {children}
      </code>
    </pre>
  )
})
