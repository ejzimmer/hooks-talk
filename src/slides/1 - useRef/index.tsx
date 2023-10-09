import { Fragment, InverseTitle } from "../../helpers/Slide"
import { ElementRef } from "./ElementRef"
import { MultipleRefs } from "./MultipleRefs"

export function UseRef() {
  return (
    <>
      <ElementRef />
      <MultipleRefs />
      <InverseTitle>
        <h2>
          Hooks store state in<br></br> arrays inside closures
        </h2>
      </InverseTitle>
    </>
  )
}
