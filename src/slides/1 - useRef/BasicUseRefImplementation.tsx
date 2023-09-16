import { Code } from "../../helpers/Code";
import { Slide } from "../../helpers/Slide";
import { SingleRefImplementation, singleRefCode } from "./SingleRef";
import { NoCurrentRef } from "./NoCurrentRef";
import { abridgedRenderCounterCode } from "../../demos/RenderCounter";

export function BasicUseRefImplementation() {
  return (
    <>
      <SingleRefImplementation />
      <Slide>
        <h2>Why do we need current?</h2>
      </Slide>
      <NoCurrentRef />
      <Slide>
        <Code>{singleRefCode}</Code>
        <Code isBackground>{abridgedRenderCounterCode}</Code>
      </Slide>
    </>
  );
}
