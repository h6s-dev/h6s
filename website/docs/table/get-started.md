---
sidebar_position: 1
---

# Get started

1. `@h6s/table` is `TableModel` manager
2. Create complex table UI!

## Install

### yarn

```sh
yarn add @h6s/table
```

### npm

```sh
npm install --save @h6s/table
```

## Define Table as Model

```tsx
const myTableModel = []
```

## Get Table Instance

`useTable` hooks are the most important functions and everything in Calendar. These hooks return almost everything you need to construct a table.

```ts
import { useTable } from '@h6s/table'

const [instance, controls] = useTable({
  model: myTableModel,
  source: [],
})
```

## Build UI with anything

You can use anything UI frameworks (like [Chakra UI](https://chakra-ui.com/), [MUI](https://mui.com/), etc ...)

```tsx
import { useTable } from '@h6s/table'

export default function Table() {
  const [{ theadGroups, rows }, controls] = useTable({
    model: myTableModel,
    source: [],
  })

  return (
    <Table>
      <Thead>
        {theadGroups.map(({ theads, getRowProps }) => {
          const props = getRowProps()

          return (
            <Tr key={props.id} {...props}>
              {theads.map(head => (
                <Th>{head.render({ cellProps: head })}</Th>
              ))}
            </Tr>
          )
        })}
      </Thead>
      <Tbody>
        {rows.map(({ cells, getRowProps }) => {
          const props = getRowProps()

          return (
            <Tr key={props.id} {...props}>
              {cells.map(cell => (
                cell.colSpan === 0 ? null : (
                  <Td key={cell.id}>{cell.render({ cellProps: cell })}</Td>
                )
              )}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
```

:::info Done

This is all you need to do to draw a complex table.

:::
