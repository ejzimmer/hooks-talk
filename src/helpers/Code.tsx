import { forwardRef } from "react"

type Props = {
  fontSize?: string
  children: string
  highlightLines?: string
  isTransparent?: boolean
  isTwoUp?: boolean
  className?: string
  style?: any
}

export const Code = forwardRef<HTMLElement, Props>(function Code(
  {
    highlightLines,
    fontSize,
    isTransparent,
    isTwoUp,
    className,
    style,
    children,
  },
  ref
) {
  return (
    <pre
      style={{
        fontSize: isTransparent ? "inherit" : fontSize,
        margin: isTransparent ? 0 : undefined,
        backgroundColor: isTransparent ? "transparent" : undefined,
        boxShadow: isTransparent ? "none" : undefined,
        overflow: "auto",
        maxHeight: isTwoUp ? "300px" : "100%",
      }}
      className={className}
    >
      <code
        className="tsx"
        style={{
          backgroundColor: isTransparent ? "transparent" : undefined,
          overflow: isTwoUp ? "visible" : "auto",
        }}
        data-line-numbers={highlightLines}
        ref={ref}
      >
        {children}
      </code>
    </pre>
  )
})
