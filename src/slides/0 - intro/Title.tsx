import { Slide } from "../../helpers/Slide"

export function Title() {
  return (
    <Slide
      data-background-color="var(--text-colour)"
      data-background-image="clawshot-link.png"
      data-background-size="50%"
      data-background-position="bottom right"
    >
      <h1
        style={{
          color: "var(--primary-colour)",
        }}
      >
        Hooked on Hooks
      </h1>
    </Slide>
  )
}
