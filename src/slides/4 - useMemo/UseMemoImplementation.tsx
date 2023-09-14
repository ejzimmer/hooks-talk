import { Code } from "../../helpers/Code";
import { Fragment, Slide } from "../../helpers/Slide";

const useMemoImplementationCode = `const React = () => {
  let currentIndex = 0;
  const memoisedValues = [];

  function after() {
    currentIndex = 0;
  }

  return {
    // ... useRef ...
    // ... useState ...
    // ... useEffect
    useMemo(calculateValue, deps) {
      const memoisedValue = memoisedValues[currentIndex];
      const needsUpdating =
        !memoisedValue?.deps ||
        memoisedValue.deps.some((dep, index) => dep !== deps[index]);

      if (needsUpdating) {
        memoisedValues[currentIndex] = {
          value: calculateValue(),
          deps,
        };
      }

      const returnValue = memoisedValues[currentIndex].value;
      currentIndex++;

      return returnValue;
    },
}
`;

const memoisedCode = `function ItemList({ items, setItems }: Props) {
  const [sortBy, setSortBy] = useState<keyof Item | undefined>();
  const [filter, setFilter] = useState("");

  const itemsToShow = useMemo(
    () => {
      const filteredItems = filter
        ? items.filter((item) => item.name.includes(filter))
        : [...items];
      return sortBy ? filteredItems.sort(sortFunction(sortBy)) : filteredItems;
    }, 
    [filter, sortBy, items]
  );

  useEffect(() => {...}, [itemsToShow, items, setItems]);

  return (...);
}
`;

function ReactCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string;
  isBackground?: boolean;
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      className={isBackground ? "background" : ""}
      isTwoUp
    >
      {useMemoImplementationCode}
    </Code>
  );
}

function ComponentCode({
  highlightLines = "",
  isBackground,
}: {
  highlightLines?: string;
  isBackground?: boolean;
}) {
  return (
    <Code
      fontSize=".4em"
      highlightLines={highlightLines}
      className={isBackground ? "background" : ""}
      isTwoUp
    >
      {memoisedCode}
    </Code>
  );
}

function MemoArray({
  currentIndex = 0,
  memo,
  deps,
  memoisedValue,
  needsUpdating,
  returnValue,
  itemsToShow,
  filterValue,
}: {
  currentIndex?: number;
  memo?: {
    value: string;
    deps: string[] | string;
  };
  deps?: string[];
  memoisedValue?: string;
  needsUpdating?: boolean;
  returnValue?: string;
  itemsToShow?: string;
  filterValue?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        maxWidth: "50%",
      }}
    >
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>currentIndex</code>➡️<code>{currentIndex}</code>
      </div>
      <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
        <code>memoisedValues</code>➡️
        <div style={{ display: "flex", maxWidth: "220px" }}>
          [
          {memo && (
            <>
              <code>value: {memo.value}</code>
              <code>deps: {memo.deps}</code>
            </>
          )}
          ]
        </div>
      </div>
      {deps && (
        <div style={{ display: "flex", gap: ".25em", alignItems: "center" }}>
          <code style={{ color: "var(--hookVars)" }}>deps</code>➡️
          <code>[{deps.join(",")}]</code>
        </div>
      )}
      {memoisedValue && <code>memoisedValue: {memoisedValue}</code>}
      {typeof needsUpdating !== "undefined" && (
        <code>needsUpdating: {needsUpdating.toString()}</code>
      )}
      {returnValue && <code>returnValue: {returnValue}</code>}
      {itemsToShow && <code>itemsToShow: {itemsToShow}</code>}
      {filterValue && <code>filter: {filterValue}</code>}
    </div>
  );
}

export function UseMemoImplementation() {
  return (
    <>
      {/* intro slide */}
      <Slide data-transition="none-out">
        <Fragment index={2} className="fade custom">
          <ReactCode />
        </Fragment>
        <Fragment index={1} className="fade custom">
          <ComponentCode />
        </Fragment>
      </Slide>

      {/* react setup */}
      <Slide data-transition="none">
        <ReactCode highlightLines="1-3,31" />
        <ComponentCode isBackground />
        <Fragment>
          <MemoArray currentIndex={0} />
        </Fragment>
      </Slide>

      {/* initial render */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,18|2,3|5,13|6-11|12|5,13" />
        <MemoArray currentIndex={0} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13,30" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14|15-17|16" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="undefined"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14|15-17|16" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="undefined"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="16|19,24|20-23" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="undefined"
          needsUpdating={true}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="20-23|26" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="undefined"
          needsUpdating={true}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26|27" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="undefined"
          needsUpdating={true}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
          returnValue="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27|29" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={1}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="undefined"
          needsUpdating={true}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
          returnValue="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5,13|15|17" />
        <MemoArray
          currentIndex={1}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
          itemsToShow="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode isBackground />
        <MemoArray
          currentIndex={1}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode isBackground />
        <MemoArray
          currentIndex={0}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
        />
      </Slide>

      {/* re-render, no change */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1,18|2,3|5-13" />
        <MemoArray currentIndex={0} />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13,30" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14|15-17|16|17" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="['🍎', '🍍', '🦄']"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="15-17|19,24" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="['🍎', '🍍', '🦄']"
          needsUpdating={false}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="['🍎', '🍍', '🦄']"
          needsUpdating={false}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26|27" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="['🍎', '🍍', '🦄']"
          needsUpdating={false}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
          returnValue="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27|29" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={1}
          deps={["''", "undefined", "['🍎', '🍍', '🦄']"]}
          memoisedValue="['🍎', '🍍', '🦄']"
          needsUpdating={false}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
          returnValue="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5,13|15|17" />
        <MemoArray
          currentIndex={1}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
          itemsToShow="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode isBackground />
        <MemoArray
          currentIndex={1}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode isBackground />
        <MemoArray
          currentIndex={0}
          memo={{
            deps: "⬇️",
            value: "['🍎', '🍍', '🦄']",
          }}
        />
      </Slide>

      {/* re-render due to filter */}
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="1-3,18|5-13" />
        <MemoArray
          currentIndex={0}
          filterValue="🍎"
          memo={{
            value: "['🍎', '🍍', '🦄']",
            deps: ["''", "undefined", "['🍎', '🍍', '🦄']"],
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="13,30" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          memo={{
            value: "['🍎', '🍍', '🦄']",
            deps: ["''", "undefined", "['🍎', '🍍', '🦄']"],
          }}
          deps={["''", "🍎", "['🍎', '🍍', '🦄']"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          memo={{
            value: "['🍎', '🍍', '🦄']",
            deps: ["''", "undefined", "['🍎', '🍍', '🦄']"],
          }}
          deps={["''", "🍎", "['🍎', '🍍', '🦄']"]}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="14|15-17|16|17|15-17" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          memo={{
            value: "['🍎', '🍍', '🦄']",
            deps: ["''", "undefined", "['🍎', '🍍', '🦄']"],
          }}
          deps={["''", "🍎", "['🍎', '🍍', '🦄']"]}
          memoisedValue="value: ['🍎', '🍍', '🦄'], deps: ['', undefined, ['🍎', '🍍', '🦄']]"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="15-17|19,24|20-23" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          memo={{
            value: "['🍎', '🍍', '🦄']",
            deps: ["''", "undefined", "['🍎', '🍍', '🦄']"],
          }}
          deps={["''", "🍎", "['🍎', '🍍', '🦄']"]}
          memoisedValue="value: ['🍎', '🍍', '🦄'], deps: ['', undefined, ['🍎', '🍍', '🦄']]"
          needsUpdating={true}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="20-23|26" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "🍎", "['🍎', '🍍', '🦄']"]}
          memoisedValue="value: ['🍎'], deps: ['', 🍎, ['🍎', '🍍', '🦄']]"
          needsUpdating={true}
          memo={{
            deps: "⬇️",
            value: "['🍎']",
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="26|27" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={0}
          deps={["''", "🍎", "['🍎', '🍍', '🦄']"]}
          memoisedValue="value: ['🍎'], deps: ['', 🍎, ['🍎', '🍍', '🦄']]"
          needsUpdating={true}
          memo={{
            deps: "⬇️",
            value: "['🍎']",
          }}
          returnValue="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="27|29" />
        <ComponentCode highlightLines="5,13" />
        <MemoArray
          currentIndex={1}
          deps={["''", "🍎", "['🍎', '🍍', '🦄']"]}
          memoisedValue="value: ['🍎'], deps: ['', 🍎, ['🍎', '🍍', '🦄']]"
          needsUpdating={true}
          memo={{
            deps: "⬇️",
            value: "['🍎']",
          }}
          returnValue="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode isBackground />
        <ComponentCode highlightLines="5,13|15|17" />
        <MemoArray
          currentIndex={1}
          memo={{
            deps: "⬇️",
            value: "['🍎']",
          }}
          itemsToShow="⬆️"
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode isBackground />
        <MemoArray
          currentIndex={1}
          memo={{
            deps: "⬇️",
            value: "['🍎']",
          }}
        />
      </Slide>
      <Slide data-transition="none">
        <ReactCode highlightLines="5-7" />
        <ComponentCode isBackground />
        <MemoArray
          currentIndex={0}
          memo={{
            deps: "⬇️",
            value: "['🍎']",
          }}
        />
      </Slide>
    </>
  );
}
