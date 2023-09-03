import { forwardRef } from "react"

type Props = {
  fontSize?: string
  children: string
  highlightLines?: string
  transparent?: boolean
  className?: string
}

export const Code = forwardRef<HTMLElement, Props>(function Code(
  { highlightLines, fontSize, transparent, className, children },
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
      className={className}
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
