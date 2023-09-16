import { PropsWithChildren } from "react";

export function Box({
  fontSize,
  width = 150,
  children = "",
}: PropsWithChildren<{ fontSize?: string; width?: number }>) {
  return (
    <div
      style={{
        width: width || 150 + "px",
        height: (width * 2) / 3 + "px",
        border: "2px solid white",
        borderTop: "none",
        flexShrink: "0",
        fontSize: fontSize || "24px",
        display: "flex",
        alignItems: "center",
        gridColumn: "-1",
        gridRow: "1/2",
      }}
    >
      {children}
    </div>
  );
}
