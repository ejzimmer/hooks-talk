import { InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { RulesOfHooks } from "../1 - useRef/RulesOfHooks"
import { FunctionalComponentProblems } from "./FunctionalComponentsProblems"
import { Title } from "./Title"
import { WhyFunctionalComponents } from "./WhyFunctionalComponents"

export function Intro() {
  return (
    <>
      <Title />
      <Slide>
        <div style={{ width: "max-content", margin: "auto" }}>
          <h2>Erin Zimmer</h2>
          <a href="https://www.atlassian.com/" target="blank" rel="noreferrer">
            <img alt="Atlassian" src="/Atlassian-horizontal-blue-rgb.svg" />
          </a>
          <a href="https://hooks.ez.codes">hooks.ez.codes</a>
        </div>
      </Slide>
      <Slide>
        <ul>
          <li>Why hooks?</li>
          <li>The rules of hooks</li>
          <li>useRef, useState, useEffect</li>
        </ul>
      </Slide>
      <Slide>
        <h2 className="r-fit-text">Why hooks?</h2>
      </Slide>
      <WhyFunctionalComponents />
      <FunctionalComponentProblems />
      <InverseTitle>
        <h2 style={{ fontSize: "4em" }}>Hooks</h2>
      </InverseTitle>
      <RulesOfHooks />
      <InverseTitle>
        <h2>
          Hooks store state in<br></br> arrays inside closures
        </h2>
      </InverseTitle>
      <Slide>
        <blockquote>
          A closure is the combination of a function bundled together (enclosed)
          with references to its surrounding state (the lexical environment).
        </blockquote>
        <cite className="footnote">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
            target="_blank"
            rel="noreferrer"
          >
            MDN
          </a>
        </cite>
      </Slide>
      <ShinyTitle title="useRef" />
    </>
  )
}
