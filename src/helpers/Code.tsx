import { forwardRef } from "react";

type Props = {
  fontSize?: string;
  children: string;
  highlightLines?: string;
  isTransparent?: boolean;
  isTwoUp?: boolean;
  isBackground?: boolean;
};

export const Code = forwardRef<HTMLElement, Props>(function Code(
  {
    highlightLines = "",
    fontSize,
    isTransparent,
    isTwoUp,
    isBackground,
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
      className={isBackground ? "background" : ""}
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
  );
});
