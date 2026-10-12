---
"@h6s/table": patch
---

Lazily initialize the core instance in `useTable` to avoid constructing unused table models on subsequent renders. Existing source updates and column selection behavior are preserved.
