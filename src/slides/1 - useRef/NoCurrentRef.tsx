import { Code } from "../../helpers/Code";
import { Slide } from "../../helpers/Slide";
import { CountContainer } from "./BasicUseRefImplementation";

export const renderCounterWithoutCurrentCode = `function RenderCounter() {
  const count = useRef(0)

  count = count + 1

  return (...);
}
`;

export const singleRefWithoutCurrentCode = `const React = {
  ...
  let ref;

  return {
    useRef(initialValue) {
      if (typeof ref ==== 'undefined') {
        ref = initialValue
      }

      return ref
    }
  }
}`;

function RefContainer({
  isBackground,
  current,
}: {
  isBackground?: boolean;
  current?: string;
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
  );
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
  );
}

function SingleRefCode(props: Omit<ComponentCodeSlideProps, "children">) {
  return <Code {...props}>{singleRefWithoutCurrentCode}</Code>;
}

function ComponentCode(props: Omit<ComponentCodeSlideProps, "children">) {
  return <Code {...props}>{renderCounterWithoutCurrentCode}</Code>;
}

export function NoCurrentRef() {
  return (
    <>
      <Slide data-transition="none-out">
        <SingleRefCode />
        <ComponentCode />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="3" />
        <ComponentCode isBackground />
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="1,2,7 " />
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="6,7,9,12|8" />
        <ComponentCode highlightLines="2" />
        <RefContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="8|11" />
        <ComponentCode highlightLines="2" />
        <RefContainer current="0" />
        <Fragment>
          <CountContainer />
        </Fragment>
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="2" />
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="4" />
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="4" />
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="4" />
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="6" />
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode isBackground />
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="1,2,7" />
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="5,6,8" />
        <ComponentCode highlightLines="2" />
        <RefContainer current="0" />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode highlightLines="10" />
        <ComponentCode highlightLines="2" />
        <RefContainer current="0" />
        <CountContainer />
      </Slide>
      <Slide data-transition="none">
        <SingleRefCode isBackground />
        <ComponentCode highlightLines="4" />
        <RefContainer current="0" />
        <NewCountContainer current="1" />
      </Slide>
    </>
  );
}
