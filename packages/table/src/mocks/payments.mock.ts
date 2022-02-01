export interface PaymentDatasetType {
  date: string;
  id: string;
  subId: string;
  amount: number;
  cancelAmount: number;
  plcc: number;
  debit: number;
  transfer: number;
  meta: {
    transactionId: string;
  };
}

export const paymentDataset: PaymentDatasetType[] = [{
  date: new Date('2022-01-01').toISOString(),
  id: '100',
  subId: 'aaaaa',
  amount: 2400,
  cancelAmount: 0,
  plcc: 2400,
  debit: 0,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
}, {
  date: new Date('2022-01-01').toISOString(),
  id: '100',
  subId: 'aaaaa',
  amount: 10000,
  cancelAmount: 0,
  plcc: 10000,
  debit: 0,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
}, {
  date: new Date('2022-01-01').toISOString(),
  id: '100',
  subId: 'bbbbb',
  amount: 9800,
  cancelAmount: 9800,
  plcc: 0,
  debit: 9800,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
}, {
  date: new Date('2022-01-01').toISOString(),
  id: '101',
  subId: 'ccccc',
  amount: 100,
  cancelAmount: 80,
  plcc: 100,
  debit: 0,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
}, {
  date: new Date('2022-01-02').toISOString(),
  id: '200',
  subId: 'aaaaa',
  amount: 1200,
  cancelAmount: 1180,
  plcc: 0,
  debit: 1200,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
}, {
  date: new Date('2022-01-02').toISOString(),
  id: '201',
  subId: 'bbbbb',
  amount: 1200,
  cancelAmount: 1180,
  plcc: 0,
  debit: 1200,
  transfer: 0,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
}, {
  date: new Date('2022-01-03').toISOString(),
  id: '300',
  subId: 'ccccc',
  amount: 20000,
  cancelAmount: 0,
  plcc: 0,
  debit: 0,
  transfer: 20000,
  meta: {
    transactionId: 'transaction-123-aaaaa',
  },
}]
