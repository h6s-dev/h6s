import { unstable_RendererModel } from '../types/table'
import { sum } from '../utils/sum'
import { paymentDataset, PaymentDatasetType } from './payments.mock'

export const paymentsTableRendererModel: unstable_RendererModel<PaymentDatasetType> = [
  {
    accessor: 'date',
    header: 'Date',
    cell: {
      mergeRow: 'date',
    },
    footer: {
      render: [() => <>{'Total'}</>],
    },
  },
  {
    accessor: 'id',
    header: 'Id',
    cell: {
      mergeRow: ['date', 'id'],
    },
  },
  {
    accessor: 'subId',
    header: 'Sub Id',
    cell: {
      mergeRow: ({ date, id, subId }) => date + id + subId,
    },
  },
  {
    accessor: [
      {
        accessor: 'amount',
        header: 'Paid',
        footer: {
          render: [() => <>Paid: {sum(paymentDataset.map(x => x.amount))}</>],
        },
      },
      {
        accessor: 'cancelAmount',
        header: 'Canceled',
        footer: {
          render: [() => <>Canceled: {sum(paymentDataset.map(x => x.cancelAmount))}</>],
          extends: false,
        },
      },
    ],
    header: 'AMOUNT',
  },
  {
    accessor: 'buyer',
    header: 'Buyer',
  },
  {
    accessor: [
      {
        accessor: [
          {
            accessor: 'plcc',
            header: 'Plcc',
            footer: {
              render: [() => <>Plcc: {sum(paymentDataset.map(x => x.plcc))}</>],
            },
          },
          {
            accessor: 'debit',
            header: 'Debit',
            footer: {
              render: [() => <>Debit: {sum(paymentDataset.map(x => x.debit))}</>],
            },
          },
        ],
        header: 'CARD',
      },
      {
        accessor: 'transfer',
        header: 'Transfer',
        footer: {
          render: [() => <>Transfer: {sum(paymentDataset.map(x => x.transfer))}</>],
        },
      },
    ],
    header: 'PAY METHOD',
  },
  {
    accessor: 'meta.transactionId',
    header: 'Transaction Id',
  },
  {
    accessor: 'message',
    header: 'Message',
  },
]
