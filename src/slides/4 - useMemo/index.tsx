import { InventorySlide } from "../../demos/Inventory"
import { Code } from "../../helpers/Code"
import { Fragment, InverseTitle, ShinyTitle, Slide } from "../../helpers/Slide"
import { UseMemoImplementation } from "./UseMemoImplementation"

export function UseMemo() {
  return (
    <>
      <Slide>
        <blockquote>
          Effects are an escape hatch from the React paradigm.
        </blockquote>
        <cite className="footnote">
          <a
            href="https://react.dev/learn/you-might-not-need-an-effect"
            target="_blank"
            rel="noreferrer"
          >
            React docs
          </a>
        </cite>
      </Slide>
      <InventorySlide hideFilter />
      {/* <Slide>
        <Code fontSize=".4em" highlightLines="|2|4-6|12-15|21|25,26|27-31">
          {unaddableInventoryCode}
        </Code>
      </Slide>
      <UnaddableInventorySlide hideFilter />
      <Slide>
        <Code fontSize=".4em" highlightLines="2|5">
          {unaddableInventoryCode}
        </Code>
      </Slide> */}
      <Slide>
        <Code fontSize=".4em" highlightLines="|2|5-15">
          {itemListWithTooMuchEffectCode}
        </Code>
        <Fragment
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "10em",
          }}
        >
          ❌
        </Fragment>
      </Slide>
      <Slide>
        <h2>
          Don't use effects
          <br /> to transform data
        </h2>
        <Fragment>
          <blockquote>
            If you can calculate some information from the component’s props or
            its existing state variables during rendering, you should not put
            that information into that component’s state.
          </blockquote>
          <cite className="footnote">
            <a
              href="https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state"
              target="_blank"
              rel="noreferrer"
            >
              React docs
            </a>
          </cite>
        </Fragment>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="|1,2|4">
          {justRightCode}
        </Code>
      </Slide>
      <Slide>
        <h2>But what if my calculation is really expensive?</h2>
      </Slide>
      <ShinyTitle title="useMemo" />
      <InverseTitle>
        <h2>useMemo</h2>
        <ul>
          <Fragment as="li">memoise a value</Fragment>
          <Fragment as="li">ie only recalculate if it changes</Fragment>
        </ul>
      </InverseTitle>
      <Slide>
        <Code highlightLines="">{unmemoisedCode}</Code>
        <Fragment>
          <Code highlightLines="|1,6|2-4|5">{memoisedCode}</Code>
        </Fragment>
      </Slide>
      <UseMemoImplementation />
      <InverseTitle>
        <h2>useMemo</h2>
        <ul>
          <li>calculates a value</li>
          <li>only recalculates the value if the dependencies change</li>
        </ul>
      </InverseTitle>
    </>
  )
}

const unmemoisedCode = `const sortedItems = sortBy 
  ? items.sort(sortFunction(sortBy)) 
  : items;
`
const memoisedCode = `const sortedItems = useMemo(
  () => sortBy 
      ? items.sort(sortFunction(sortBy)) 
      : items, 
  [items, sortBy]
);
`

const itemListWithTooMuchEffectCode = `function ItemList({ items }) {
  const [sortedItems, setSortedItems] = useState(items);
  const [sortBy, setSortBy] = useState();

  useEffect(() => {
    if (sortBy) {
      setSortedItems(items.sort(sortFunction(sortBy)))
    } else {
      setSortedItems(items)
    }
  }, 
  [
    items, 
    sortBy,
  ]);

  const handleSort = (sortBy: keyof Item) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = sortedItems[indexToUpdate];
      setSortedItems(
        sortedItems.map((i) => (i === itemToUpdate ? { ...i, count: --i.count } : i))
      );
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sortedItems]);

  return (
    <>
      <button onClick={() => handleSort("name")}>Sort by name</button>
      <button onClick={() => handleSort("count")}>Sort by count</button>
      <ol>
        {sortedItems.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  );
}
`

const justRightCode = `function ItemList({ items, setItems }) {
  const [sortBy, setSortBy] = useState();

  const sortedItems = sortBy ? items.sort(sortFunction(sortBy)) : items;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = sortedItems[indexToUpdate];
      setItems(sortedItems.map((i) => (i === itemToUpdate ? { ...i, count: --i.count } : i)));
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sortedItems]);

  return (
    <>
      <button onClick={() => setSortBy("name")}>Sort by name</button>
      <button onClick={() => setSortBy("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem
            key={item.name}
            item={item}
          />
        ))}
      </ol>
    </>
  );
}
`
