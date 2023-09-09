import { Code } from "../../helpers/Code"
import { Fragment, Slide } from "../../helpers/Slide"
import { CountContainer } from "./BasicUseRefImplementation"

export const renderCounterWithoutCurrentCode = `export function RenderCounter() {
  const count = useRef(0)

  count = count + 1

  return (...);
}
`

export const singleRefWithoutCurrentCode = `const React = {
  ...
  let ref;

  export function useRef(initialValue: any) {
    if (typeof ref ==== 'undefined') {
      ref = initialValue
    }

    return ref
  }
}`

function RefContainer({
  isBackground,
  current,
}: {
  isBackground?: boolean
  current?: string
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        display: "flex",
        gap: ".25em",
        alignItems: "center",
        opacity: isBackground ? ".4" : 1,
      }}
    >
      <code>ref</code>➡️
      <div>{current || "undefined"}</div>
    </div>
  )
}

function NewCountContainer({ current }: { current?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "200px",
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <code>count</code>
      <div>⬇️</div>
      <div>{current}</div>
    </div>
  )
}

export function NoCurrentRef() {
  return (
    <>
      <Slide data-transition="none-out">
        <Code highlightLines="">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="">{renderCounterWithoutCurrentCode}</Code>
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="3">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="" className="background">
          {renderCounterWithoutCurrentCode}
        </Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="1,2,7 ">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="5,6,8,11|7">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="7|10">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <Fragment>
          <CountContainer />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="4">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="4">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="4">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="6">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="" className="background">
          {renderCounterWithoutCurrentCode}
        </Code>
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="1,2,7">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="5,6,8">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="10">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="" className="background">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="4">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
    </>
  )
}
