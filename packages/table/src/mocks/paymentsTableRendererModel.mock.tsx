import { RendererModel } from '../types/table'
import { sum } from '../utils/sum'
import { paymentDataset, PaymentDatasetType } from './payments.mock'

export const paymentsTableRendererModel: RendererModel<PaymentDatasetType> = [
  {
    accessor: 'date',
    label: 'Date',
    footer: [() => <>{'Total'}</>],
    rules: {
      mergeRow: 'date',
    },
  },
  {
    accessor: 'id',
    label: 'Id',
    rules: {
      mergeRow: ['date', 'id'],
    },
  },
  {
    accessor: 'subId',
    label: 'Sub Id',
    rules: {
      mergeRow: ({ date, id, subId }) => date + id + subId,
    },
  },
  {
    label: 'AMOUNT',
    accessor: [
      {
        accessor: 'amount',
        label: 'Paid',
        footer: [() => <>Paid: {sum(paymentDataset.map(x => x.amount))}</>],
      },
      {
        accessor: 'cancelAmount',
        label: 'Canceled',
        footer: [() => <>Canceled: {sum(paymentDataset.map(x => x.cancelAmount))}</>],
      },
    ],
  },
  {
    accessor: 'buyer',
    label: 'Buyer',
  },
  {
    label: 'PAY METHOD',
    accessor: [
      {
        label: 'CARD',
        accessor: [
          {
            label: 'Plcc',
            accessor: 'plcc',
            footer: [() => <>Plcc: {sum(paymentDataset.map(x => x.plcc))}</>],
          },
          {
            label: 'Debit',
            accessor: 'debit',
            footer: [() => <>Debit: {sum(paymentDataset.map(x => x.debit))}</>],
          },
        ],
      },
      {
        label: 'Transfer',
        accessor: 'transfer',
        footer: [() => <>Transfer: {sum(paymentDataset.map(x => x.transfer))}</>],
      },
    ],
  },
  {
    label: 'Transaction Id',
    accessor: 'meta.transactionId',
  },
  {
    label: 'Message',
    accessor: 'message',
  },
]
