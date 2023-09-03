import { Code } from "../../helpers/Code"
import { Slide } from "../../helpers/Slide"
import { CountContainer, RefContainer } from "./BasicUseRefImplementation"

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
      <img alt="a container" src="./box.jpeg" style={{ width: "150px" }} />
      {current && (
        <div
          style={{
            position: "absolute",
            right: "0",
            width: "150px",
            color: "black",
            bottom: "30px",
          }}
        >
          {current}
        </div>
      )}
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
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="" className="background">
          {renderCounterWithoutCurrentCode}
        </Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="1,2,7">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,5,6,8,12|1-3,7,12">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,7,12|1-3,10,12">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,10,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="2">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="4">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="4">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="6">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="" className="background">
          {renderCounterWithoutCurrentCode}
        </Code>
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="1,2,7">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,5,6,8,11,12">
          {singleRefWithoutCurrentCode}
        </Code>
        <Code highlightLines="1,2,7">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,10,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="1,2,7">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <Code highlightLines="1-3,12">{singleRefWithoutCurrentCode}</Code>
        <Code highlightLines="1,4,7">{renderCounterWithoutCurrentCode}</Code>
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
    </>
  )
}
