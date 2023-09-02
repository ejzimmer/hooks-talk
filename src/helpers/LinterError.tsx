import { PropsWithChildren, ReactNode } from "react"

type Props = {
  ruleName: string
  ruleLink: string
  code: ReactNode
}

export function LinterError({
  ruleName,
  ruleLink,
  code,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: ".6em",
        width: "80%",
        margin: "auto",
        textAlign: "start",
        border: "1px solid",
        borderRadius: "5px",
        padding: "0.5em",
        backgroundColor: "#444",
        color: "#ccc",
        overflow: "hidden",
      }}
    >
      {children}{" "}
      <span style={{ color: "#888" }}>
        eslint(
        <a
          target="_blank"
          rel="noreferrer"
          href={ruleLink}
          style={{
            color: "hsl(200 100% 30%)",
            textDecoration: "underline",
          }}
        >
          {ruleName}
        </a>
        )
      </span>
      <hr style={{ marginInline: "-.5em", color: "inherit" }} />
      <div>{code}</div>
      <hr style={{ marginInline: "-.5em", color: "inherit" }} />
      <div
        style={{
          backgroundColor: "#555",
          color: "hsl(200 100% 60%)",
          margin: "-.5em",
          padding: ".5em",
        }}
      >
        View Problem (Alt+F8)&nbsp;&nbsp;&nbsp;Quick Fix... (Ctrl+.)
      </div>
    </div>
  )
}
