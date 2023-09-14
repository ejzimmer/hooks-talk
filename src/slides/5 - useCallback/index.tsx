import { Code } from "../../helpers/Code";
import { Slide, InverseTitle, Fragment, ShinyTitle } from "../../helpers/Slide";
import { LinterError } from "../../helpers/LinterError";
import { InventorySlide } from "../../demos/Inventory";

export function UseCallback() {
  return (
    <>
      <InventorySlide />
      <Slide>
        <Code highlightLines="|4">{onClickCode}</Code>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="5-9">
          {useItemCode}
        </Code>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="7-9|40|17|26">
          {extractConsumeItemCode}
        </Code>
      </Slide>

      <Slide>
        <LinterError
          ruleName="react-hooks/exhaustive-deps"
          ruleLink="https://github.com/facebook/react/issues/14920"
          code={
            <Code isTransparent>
              const consumeItem: (item: Item) =&gt; void
            </Code>
          }
        >
          The 'consumeItem' function makes the dependencies of useEffect Hook
          (at line 533) change on every render. Move it inside the useEffect
          callback. Alternatively, wrap the definition of 'consumeItem' in its
          own useCallback() Hook.
        </LinterError>
      </Slide>
      <Slide>
        <Code fontSize=".4em" highlightLines="7-10">
          {extractConsumeItemCode}
        </Code>
      </Slide>

      <Slide>
        <Code highlightLines="|2">{memoisedConsumeItemCode}</Code>
      </Slide>

      <ShinyTitle title="useCallback" />
      <InverseTitle>
        <h2>useCallback</h2>
        <ul>
          <Fragment as="li">
            <code>useMemo</code> for functions
          </Fragment>
        </ul>
      </InverseTitle>
      <Slide>
        <Code fontSize=".4em" highlightLines="">
          {memoisedConsumeItemCode}
        </Code>
        <Fragment>
          <Code fontSize=".4em" highlightLines="|2">
            {callbackisedConsumeItemCode}
          </Code>
        </Fragment>
      </Slide>
    </>
  );
}

const onClickCode = `<ol>
{sortedItems.map((item) => (
  <li key={item.name}>
    <button onClick={...}>
      {item.name} {item.count}
    </button>
  </li>
))}
</ol>`;

const useItemCode = `useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.key.match(/^[0-9]$/)) return
    const indexToUpdate = Number.parseInt(event.key) - 1
    setSortedItems(
      sortedItems.map((item, index) =>
        index === indexToUpdate ? { ...item, count: --item.count } : item
      )
    )
  }

  isCurrent && window.addEventListener("keydown", onKeyDown)

  return () => window.removeEventListener("keydown", onKeyDown)
}, [sortedItems, isCurrent])
`;

export const extractConsumeItemCode = `function ItemList({ items, setItems }: Props) {
  const [sortBy, setSortBy] = useState<keyof Item | undefined>();
  const [filter, setFilter] = useState("");

  const itemsToShow = useMemo(...);

  const consumeItem = (item: Item) => {
    setItems(items.map((i) => (i === item ? { ...i, count: --i.count } : i)));
  };

  useEffect(
    () => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (!event.key.match(/^[0-9]$/)) return;
        const indexToUpdate = Number.parseInt(event.key) - 1;
        const itemToUpdate = itemsToShow[indexToUpdate];
        consumeItem(itemToUpdate);
      };

      window.addEventListener("keydown", onKeyDown);

      return () => window.removeEventListener("keydown", onKeyDown);
    }, 
    [
      itemsToShow, 
      consumeItem, 
      isCurrent
    ]
  );

  return (
    <>
      <input onChange={(event) => setFilter(event.target.value)} />
      <button onClick={() => setSortBy("name")}>Sort by name</button>
      <button onClick={() => setSortBy("count")}>Sort by count</button>
      <ol>
        {itemsToShow.map((item) => (
          <ListItem
            key={item.name}
            onClick={() => consumeItem(item)}
            item={item}
          />
        ))}
      </ol>
    </>
  );
}
`;

export const memoisedConsumeItemCode = `const consumeItem = useMemo(
  () => (item: Item) => {
    setItems(
      items.map(
        (i) => (i === item ? { ...i, count: --i.count } : i)
      )
    )
  }, 
  [items, setItems]
)`;

export const callbackisedConsumeItemCode = `const consumeItem = useCallback(
  (item: Item) => {
    setItems(
      items.map(
        (i) => (i === item ? { ...i, count: --i.count } : i)
      )
    )
  }, 
  [items, setItems]
)`;
