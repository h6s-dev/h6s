---
sidebar_position: 1
---

# Get started

1. `@h6s/calendar` treat calendar as matrix (2x2)
2. Quickly create calendar UI with table HTML elements!

## Install

### yarn

```sh
yarn add @h6s/calendar
```

### npm

```sh
npm install --save @h6s/calendar
```

## Get calendar data

`useCalendar` hooks are the most important functions and everything in Calendar. These hooks return almost everything you need to construct a calendar.

```ts
import { useCalendar } from '@h6s/calendar'

const { headers, body, view } = useCalendar()
```

## Build UI with anything

You can use anything UI frameworks (like [Chakra UI](https://chakra-ui.com/), [MUI](https://mui.com/), etc ...)

```tsx
import { useCalendar } from '@h6s/calendar'

export default function Calendar() {
  const { headers, body, view } = useCalendar()

  return (
    <Table>
      <Thead>
        <Tr>
          {headers.weekDays.map(({ key, value }) => {
            return <Th key={key}>{format(value, 'E', { locale })}</Th>
          })}
        </Tr>
      </Thead>
      <Tbody>
        {body.value.map(({ key, value: days }) => (
          <Tr key={key}>
            {days.map(({ key, value }) => (
              <Td key={key}>{getDate(value)}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
```

:::info Done

This is all you need to do to draw a complex calendar.

:::
