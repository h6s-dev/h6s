import { DateCell } from "../models";
import { generateID } from "../utils";

export default function withKeyProps(keyPrefix: string) {
  return <T extends DateCell>(cell: T) => ({
    ...cell,
    key: generateID(keyPrefix),
  });
}
