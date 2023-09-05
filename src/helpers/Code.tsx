import { forwardRef } from "react"

type Props = {
  fontSize?: string
  children: string
  highlightLines?: string
  transparent?: boolean
  className?: string
  style?: any
}

export const Code = forwardRef<HTMLElement, Props>(function Code(
  { highlightLines, fontSize, transparent, className, style, children },
  ref
) {
  return (
    <pre
      style={{
        fontSize: transparent ? "inherit" : fontSize,
        margin: transparent ? 0 : undefined,
        backgroundColor: transparent ? "transparent" : undefined,
        boxShadow: transparent ? "none" : undefined,
        ...style,
      }}
      className={className}
    >
      <code
        className="tsx"
        style={{
          backgroundColor: transparent ? "transparent" : undefined,
          overflow: "hidden",
        }}
        data-line-numbers={highlightLines}
        ref={ref}
      >
        {children}
      </code>
    </pre>
  )
})
