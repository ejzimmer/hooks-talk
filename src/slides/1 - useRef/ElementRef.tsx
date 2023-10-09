import {
  AddItemForm,
  addItemFormWithCountCode,
} from "../../demos/Inventory/AddItemForm"
import { Code } from "../../helpers/Code"
import { Fragment, Notes, Slide } from "../../helpers/Slide"

export function ElementRef() {
  return (
    <>
      <Slide>
        <AddItemForm
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
    </>
  )
}
