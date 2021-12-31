---
sidebar_position: 3
title: 'Migration Guide'
---

:::note Need to migration

Few deployments will be disruptive enough to warrant a guide. However, if a breaking change is necessary according to the development direction of open source, a guide will be provided and appropriate measures will be taken accordingly.

:::

## Have you using [@veccu/react-calendar](https://www.npmjs.com/package/@veccu/react-calendar)?

:::tip

Please use **[@h6s/calendar](https://www.npmjs.com/package/@h6s/calendar)**. [@veccu/react-calendar](https://www.npmjs.com/package/@veccu/react-calendar) is deprecated.  
There is **no change** in interface or implementation. It's simply a package rebranding.

:::

### 1. Replace package

```bash
yarn remove @veccu/react-calendar
```

and

```bash
yarn add @h6s/calendar
```

### 2. Change code

```diff
- import useCalendar from '@veccu/react-calendar';
+ import { useCalendar } from '@h6s/calendar';
```

> It's done!
