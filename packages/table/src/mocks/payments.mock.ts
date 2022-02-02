import { composeDataset, TableCore } from '..'
import { sum } from '../utils/sum'

export interface PaymentDatasetType {
  date: string;
  id: string;
  subId: string;
  amount: number;
  cancelAmount: number;
  buyer: string;
  plcc: number;
  debit: number;
  transfer: number;
  meta: {
    transactionId: string;
  };
  message: string;
}

export const paymentDataset: PaymentDatasetType[] = [{
  date: new Date('2022-01-01').toISOString(),
  id: '100',
  subId: 'aaaaa',
  amount: 2400,
  cancelAmount: 0,
  buyer: 'Dan',
  plcc: 2400,
  debit: 0,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
  message: 'success',
}, {
  date: new Date('2022-01-01').toISOString(),
  id: '100',
  subId: 'aaaaa',
  amount: 10000,
  cancelAmount: 0,
  buyer: 'Jbee',
  plcc: 10000,
  debit: 0,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
  message: 'success',
}, {
  date: new Date('2022-01-01').toISOString(),
  id: '100',
  subId: 'bbbbb',
  amount: 9800,
  cancelAmount: 9800,
  buyer: 'Mark',
  plcc: 0,
  debit: 9800,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
  message: 'success',
}, {
  date: new Date('2022-01-01').toISOString(),
  id: '101',
  subId: 'ccccc',
  amount: 100,
  cancelAmount: 80,
  buyer: 'John',
  plcc: 100,
  debit: 0,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
  message: 'success',
}, {
  date: new Date('2022-01-02').toISOString(),
  id: '200',
  subId: 'aaaaa',
  amount: 1200,
  cancelAmount: 1180,
  buyer: 'Kent',
  plcc: 0,
  debit: 1200,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
  message: 'success',
}, {
  date: new Date('2022-01-02').toISOString(),
  id: '201',
  subId: 'bbbbb',
  amount: 1200,
  cancelAmount: 1180,
  buyer: 'Bill',
  plcc: 0,
  debit: 1200,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
  message: 'success',
}, {
  date: new Date('2022-01-03').toISOString(),
  id: '300',
  subId: 'ccccc',
  amount: 20000,
  cancelAmount: 0,
  buyer: 'Musk',
  plcc: 0,
  debit: 0,
  transfer: 20000,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
  message: 'success',
}]

export const paymentDatasetWithSum = composeDataset(paymentDataset, {
  groupBy: 'date',
  compose: rows => {
    const appended = TableCore.compose(rows, {
      groupBy: 'id',
      compose: rows => {
        return rows.concat({
          subId: '#SUB_TOTAL',
          amount: sum(rows.map(x => x.amount)),
          cancelAmount: sum(rows.map(x => x.cancelAmount)),
          buyer: 'N/A',
          plcc: sum(rows.map(x => x.plcc)),
          debit: sum(rows.map(x => x.debit)),
          transfer: sum(rows.map(x => x.transfer)),
          meta: {
            transactionId: 'N/A',
          },
          message: 'N/A',
        })
      },
    })

    return appended.concat({
      id: '#TOTAL',
      subId: '',
      amount: sum(rows.map(x => x.amount)),
      cancelAmount: sum(rows.map(x => x.cancelAmount)),
      buyer: 'N/A',
      plcc: sum(rows.map(x => x.plcc)),
      debit: sum(rows.map(x => x.debit)),
      transfer: sum(rows.map(x => x.transfer)),
      meta: {
        transactionId: 'N/A',
      },
      message: 'N/A',
    })
  },
})
