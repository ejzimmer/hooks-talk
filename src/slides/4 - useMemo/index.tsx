import { useRef } from "react";
import {
  InventorySlide,
  UnaddableInventorySlide,
  useDodgyEventHandlers,
} from "../../demos/Inventory";
import { Code } from "../../helpers/Code";
import {
  Fragment,
  InverseTitle,
  Notes,
  ShinyTitle,
  Slide,
} from "../../helpers/Slide";

// useMemo
// code with useMemo
// step through code with useMemo
// summary - no redundant state, test performance, useMemo
// add buttons
// extract repeated code
// callback causing re-render problem
// fix with useMemo but isn't it a bit icky
// useCallback shiny slide
// useCallback = useMemo for functions
// transform code from useMemo to useCallback
// now everything works great yay - demo
// summary
// further reading
// thanks

export function UseMemo() {
  return (
    <>
      <UnaddableInventorySlide />
      <Slide>
        <Code fontSize=".4em" highlightLines="|2|34-36|8-10">
          {unaddableInventoryCode}
        </Code>
      </Slide>
      <Slide>
        <Code
          fontSize=".4em"
          highlightLines="6,7,19,20,23|3|25-27|21|9-11,17|4|28-30|13-16,22"
        >
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
        <Notes>
          <p>
            we tend to think of useEffect as a mechanism to watch for changes,
            but that's not really what it is. the whole of react is a mechanism
            to watch for changes. useEffect is for dealing with things outside
            the control of react
          </p>
          <p>
            if your effect is happening due to a user interaction, use an event
            handler
          </p>
          <p>
            if your effect is transforming data for rendering - like we're doing
            here - we don't even need anything
          </p>
        </Notes>
      </Slide>
      <Slide>
        <h2>Don't use effects to transform data</h2>
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
        <Code fontSize=".4em" highlightLines="|2,3|18|5,6|8-11">
          {justRightCode}
        </Code>
      </Slide>
      <InventorySlide />

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
      <Slide data-transition="slide-in fade-out">
        <Code>{unmemoisedCode}</Code>
        <Fragment>
          <Code>{memoisedCode}</Code>
        </Fragment>
      </Slide>
      <Slide data-transition="fade-in slide-out">
        <Code highlightLines="2|3">{memoisedCode}</Code>
      </Slide>
      <Slide>
        <h2>useMemo</h2>
        <ul>
          <li>calculates a value</li>
          <li>only recalculates the value if the dependencies change</li>
        </ul>
      </Slide>
    </>
  );
}

const unmemoisedCode = `const sortedItems = [...items].sort(sortFunction(sortBy))`;
const memoisedCode = `const sortedItems = useMemo(
  () => [...items].sort(sortFunction(sortBy)), 
  [items, sortBy]
)`;

const unaddableInventoryCode = `export function ItemList({ items }: Props) {
  const [itemsToShow, setItemsToShow] = useState<Item[]>(items);

  const handleSort = (sortBy: keyof Item) => {
    setItemsToShow([...itemsToShow].sort(sortFunction(sortBy)));
  };
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsToShow(
      items.filter((item) => item.name.includes(event.target.value))
    );
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = itemsToShow[indexToUpdate];
      setItemsToShow(
        items.map((i) => (i === itemToUpdate ? { ...i, count: --i.count } : i))
      );
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemsToShow, items, isCurrent]);

  return (
    <>
      <input onChange={handleFilter} />
      <button onClick={() => handleSort("name")}>Sort by name</button>
      <button onClick={() => handleSort("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  );
}
`;

const itemListWithTooMuchEffectCode = `function ItemList({ items }: Props) {
  const [itemsToShow, setItemsToShow] = useState<Item[]>(items);
  const [sortBy, setSortBy] = useState<keyof Item>();
  const [filterBy, setFilterBy] = useState<string>();

  useEffect(() => {
    setItemsToShow(items)

    if (sortBy) {
      const sortedItems = items.sort(sortFunction(sortBy))
      setItemsToShow(sortedItems)

      if (filterBy) {
        const filteredItems = sortedItems.filter((item) => item.name.includes(filterBy))
        setItemsToShow(filteredItems)
      }
    }
  }, 
  [
    items, 
    sortBy, 
    filterBy
  ]);

  const handleSort = (sortBy: keyof Item) => {
    setSortBy(sortBy);
  };
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(event.target.value);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = itemsToShow[indexToUpdate];
      setItemsToShow(
        items.map((i) => (i === itemToUpdate ? { ...i, count: --i.count } : i))
      );
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemsToShow, items, isCurrent]);

  return (
    <>
      <input onChange={handleFilter} />
      <button onClick={() => handleSort("name")}>Sort by name</button>
      <button onClick={() => handleSort("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ol>
    </>
  );
}
`;

const justRightCode = `function ItemList({
  items,
  setItems,
}: Props) {
  const [sortBy, setSortBy] = useState<keyof Item | undefined>();
  const [filter, setFilter] = useState("");

  const filteredItems = filter
    ? items.filter((item) => item.name.includes(filter))
    : [...items];
  const itemsToShow = sortBy ? filteredItems.sort(sortFunction(sortBy)) : filteredItems;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key.match(/^[0-9]$/)) return;
      const indexToUpdate = Number.parseInt(event.key) - 1;
      const itemToUpdate = itemsToShow[indexToUpdate];
      setItems(items.map((i) => (i === itemToUpdate ? { ...i, count: --i.count } : i)));
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemsToShow, items, setItems]);

  return (
    <>
      <input onChange={(event) => setFilter(event.target.value)} />
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
`;
