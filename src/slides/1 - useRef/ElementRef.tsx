import {
  AddItemForm,
  addItemFormCode,
  addItemFormWithCountCode,
} from "../../demos/Inventory/AddItemForm"
import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"
import { singleRefCode } from "./SingleRef"

export function ElementRef() {
  return (
    <>
      <Slide>
        <AddItemForm onSubmit={(value) => alert(`Adding ${value}`)} />
        <Fragment>
          <Code fontSize=".5em" highlightLines="|2|11|6">
            {addItemFormCode}
          </Code>
        </Fragment>
        <Notes>
          <ul>
            <li>probably most common use of useRef</li>
            <li>but what if there are multiple fields in our form?</li>
          </ul>
        </Notes>
      </Slide>

      <Slide>
        <AddItemForm
          showCount
          onSubmit={(value, count) => alert(`Adding ${count} ${value}s`)}
        />
        <Fragment>
          <Code fontSize="0.4em" highlightLines="|2,3|12,13|7">
            {addItemFormWithCountCode}
          </Code>
        </Fragment>
        <Notes>
          we can just add more useRefs, but it breaks our basic useRef
          implementation
        </Notes>
      </Slide>

      <Slide>
        <Code>{singleRefCode}</Code>
      </Slide>
    </>
  )
}
