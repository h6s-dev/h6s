---
sidebar_position: 1
---

# Get started

`@h6s/table` is module for creating complex table UI

## Install

### yarn

```sh
yarn add @h6s/table
```

### npm

```sh
npm install --save @h6s/table
```

## Build Table

### Source

```tsx
interface Product {
  id: number;
  product: {
    name: string;
    price: number;
  };
  createdAt: string;
}
```

### Define Model

```tsx
const model: TableModel<Product> = [
  {
    accessor: 'id', // <- keyof Product
    label: 'Id', // <- whatever
  },
  {
    accessor: 'product.name',
    label: 'Name',
  },
  {
    accessor: 'product.price',
    label: 'Price',
  },
  {
    accessor: 'createdAt',
    label: 'Created Date',
  },
]
```

## Get Table Instance

`useTable` hooks are the most important functions and everything in Table. These hooks return almost everything you need to construct a table.

```ts
import { useTable } from '@h6s/table'

const [instance, controls] = useTable({
  model: model,
  source: products,
})
```

- `instance`: serve data for building table UI.

```tsx
type TableInstance<Row> = {
  theadGroups: Array<{
    getRowProps: () => RowProps;
    theads: Array<THead<Row>>;
  }>;
  rows: Array<{
    getRowProps: () => RowProps;
    cells: Array<Cell<Row>>;
  }>;
  tfoots: Array<TFoot<Row>> | null;

  headMeta: HeadMeta;
  selectableHeadIds: HeadId<Row>[]
  visibleHeadIds: HeadId<Row>[]
}
```

- `controls`: serve interface to control table.

```ts
type TableControls = {
  updateHead: (headIds?: Array<HeadId<Row>>) => void;
}
```

## Build UI with anything

You can use anything UI frameworks (like [Chakra UI](https://chakra-ui.com/), [MUI](https://mui.com/), etc ...)

```tsx
import { useTable } from '@h6s/table'

export default function Table() {
  const [{ theadGroups, rows }, controls] = useTable({
    model: myTableModel,
    source: products,
  })

  return (
    <table>
      <thead>
        {theadGroups.map(({ theads, getRowProps }) => {
          const props = getRowProps()

          return (
            <tr key={props.id} {...props}>
              {theads.map(head => (
                <th>{head.render({ cellProps: head })}</th>
              ))}
            </tr>
          )
        })}
      </thead>
      <tbody>
        {rows.map(({ cells, getRowProps }) => {
          const props = getRowProps()

          return (
            <tr key={props.id} {...props}>
              {cells.map(cell => (
                cell.colSpan !== 0
                  ? <td key={cell.id}>{cell.render({ cellProps: cell })}</td>
                  : null
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
```

:::info Done

This is all you need to do to draw a complex table.

:::
