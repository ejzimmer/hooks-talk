import { useRef } from "react"
import { Notes, Slide } from "../../helpers/Slide"

export function RulesOfHooks() {
  return (
    <>
      <Slide>
        <h2>Rules of Hooks</h2>
        <ul>
          <li>Only Call Hooks at the Top Level</li>
          <li>Only Call Hooks from React Functions</li>
        </ul>
        <cite style={{ display: "block" }}>
          <a href="https://legacy.reactjs.org/docs/hooks-rules.html">
            Rules of Hooks in React docs
          </a>
        </cite>
        <Notes>
          these rules only seem to appear in the legacy docs they're mentioned
          in the new docs but don't have a fancy title
        </Notes>
      </Slide>

      <Slide>
        <div
          style={{
            position: "fixed",
            boxSizing: "border-box",
            inset: "0px",
            width: "100%",
            height: "400px",
            fontSize: "large",
            padding: "2rem 2rem 4rem",
            lineHeight: 1.2,
            whiteSpace: "pre-wrap",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            textAlign: "left",
          }}
        >
          <div
            style={{
              color: "rgb(232, 59, 70)",
              fontSize: "2em",
              whiteSpace: "pre-wrap",
              fontFamily: "sans-serif",
              margin: "0px 2rem 2rem 0px",
              flex: "0 0 auto",
              maxHeight: "50%",
              overflow: "auto",
            }}
          >
            Compiled with problems:
          </div>
          <button
            style={{
              color: "rgb(255, 255, 255)",
              lineHeight: "1rem",
              fontSize: "1.5rem",
              padding: "1rem",
              cursor: "pointer",
              position: "absolute",
              right: "0px",
              top: "0px",
              backgroundColor: "transparent",
              border: "medium",
            }}
          >
            ×
          </button>
          <div>
            <div
              style={{
                backgroundColor: "rgba(206, 17, 38, 0.1)",
                color: "rgb(252, 207, 207)",
                padding: "1rem 1rem 1.5rem",
              }}
            >
              <div
                style={{
                  color: "rgb(232, 59, 70)",
                  fontSize: "1.2em",
                  marginBottom: "1rem",
                  fontFamily: "sans-serif",
                }}
              >
                ERROR
              </div>
              <div
                style={{
                  lineHeight: 1.5,
                  fontSize: "1rem",
                  fontFamily: "Menlo, Consolas, monospace",
                }}
              >
                [eslint] src/slides/1 - useRef/RulesOfHooks.tsx
                <span style={{ fontWeight: "bold" }}>Line 54:19:</span> React
                Hook "useRef" is called conditionally. React Hooks must be
                called in the exact same order in every component render{" "}
                <span style={{ color: "#E36049" }}>
                  <u>react-hooks/rules-of-hooks</u>
                </span>
                Search for the{" "}
                <u>
                  <span style={{ color: "#E36049" }}>keywords</span>
                </u>{" "}
                to learn more about each error.
              </div>
            </div>
          </div>
        </div>{" "}
      </Slide>
    </>
  )
}
