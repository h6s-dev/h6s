import type { TableModel } from "../types/table";
import { sum } from "../utils/sum";
import { type PaymentDatasetType, paymentDataset } from "./payments.mock";

export const paymentsTableModel: TableModel<PaymentDatasetType> = [
  {
    accessor: "date",
    label: "Date",
    cell: {
      mergeRow: "date",
    },
    foot: [() => <>{"Total"}</>],
  },
  {
    accessor: "id",
    label: "Id",
    cell: {
      mergeRow: ["date", "id"],
      colSpanAs: (x) => (x.id === "#TOTAL" ? 2 : 1),
    },
  },
  {
    accessor: "subId",
    label: "Sub Id",
    cell: {
      mergeRow: ({ date, id, subId }) => date + id + subId,
      colSpanAs: (x) => (x.id === "#TOTAL" ? 0 : 1),
    },
  },
  {
    accessor: [
      {
        accessor: "amount",
        label: "Paid",
        foot: () => <>Paid: {sum(paymentDataset.map((x) => x.amount))}</>,
      },
      {
        accessor: "cancelAmount",
        label: "Canceled",
        foot: {
          render: [() => <>Canceled: {sum(paymentDataset.map((x) => x.cancelAmount))}</>],
          extends: false,
        },
      },
    ],
    label: "AMOUNT",
  },
  {
    accessor: "buyer",
    label: "Buyer",
  },
  {
    accessor: [
      {
        accessor: [
          {
            accessor: "plcc",
            label: "Plcc",
            foot: {
              render: [() => <>Plcc: {sum(paymentDataset.map((x) => x.plcc))}</>],
            },
          },
          {
            accessor: "debit",
            label: "Debit",
            foot: {
              render: [() => <>Debit: {sum(paymentDataset.map((x) => x.debit))}</>],
            },
          },
        ],
        label: "CARD",
      },
      {
        accessor: "transfer",
        label: "Transfer",
        foot: {
          render: [() => <>Transfer: {sum(paymentDataset.map((x) => x.transfer))}</>],
        },
      },
    ],
    label: "PAY METHOD",
  },
  {
    accessor: "meta.transactionId",
    label: "Transaction Id",
  },
  {
    accessor: "message",
    label: "Message",
  },
];
