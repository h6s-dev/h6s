<div align="center">
  <img src="./assets/react-calendar.png" width="640px">
</div>

Headless Calendar UI Library

![GitHub Action Status](https://github.com/veccu/react-calendar/workflows/Deploy/badge.svg)[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![npm version](https://badge.fury.io/js/@veccu/react-calendar.svg)](https://badge.fury.io/js/@veccu/react-calendar)

## Installation

```sh
yarn add @veccu/react-calendar
```

### peerDependencies

```json
"peerDependencies": {
  "date-fns": ">= 2",
  "react": ">= 16.8",
  "react-dom": ">= 16.8"
}
```

## Getting Started

```tsx
import useCalendar from '@veccu/react-calendar'

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
        {body.weeks.map(({ key, value: days }) => (
          <Tr key={key}>
            {days.map(({ key, value }) => (
              <Td key={key}>{getDate(value.date)}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
```

## RoadMap

- [x] Support view type (month, week, day)
- [x] Support navigation (to next, to prev, to Today)
- [ ] Support a11y (Keyboard navigate)
- [ ] Documentation
- [ ] Add some examples about each case
- [ ] Support i18n

## Show your support

Give a ⭐️ if this project helped you!

<div align="center">
  <sub>
    <sup>Managed by <a href="https://github.com/JaeYeopHan">@Jbee</a></sup>
  </sub>
  <small>✌</small>
</div>
