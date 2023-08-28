import { Highlight, HighlightProps, themes } from "prism-react-renderer"

type Props = {
  language?: HighlightProps["language"]
  fontSize?: string
  children: string
}

export function Code({ language = "tsx", fontSize, children }: Props) {
  return (
    <Highlight language={language} code={children} theme={themes.dracula}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, fontSize }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} data-line-numbers>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
