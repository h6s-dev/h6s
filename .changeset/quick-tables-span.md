---
"@h6s/table": patch
---

Cache the maximum row span as merge groups are updated to avoid scanning every group for each row. This also avoids argument-limit errors with large datasets and returns a default row span of 1 when no merge rules apply.
