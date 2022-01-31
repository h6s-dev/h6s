import { RendererModel } from '../types/tabler'
import { sum } from '../utils/sum'
import { useTable } from './useTable'

export default {
  title: 'Table/basic',
  component: Example,
}

export function Example() {
  const [instance] = useTable({
    model: rendererModel,
    source: mockDataset,
  })

  return (
    <table style={{ border: '1px solid grey' }}>
      <thead>
        {instance.headerGroups.map(({ headers, getRowProps }) => {
          const props = getRowProps()

          return (
            <tr key={props.id} {...props}>
              {headers.map(header => {
                return (
                  <th key={header.id} rowSpan={header.rowSpan} colSpan={header.colSpan} style={{ border: '1px solid grey' }}>
                    {header.render({ cellProps: header })}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody>
        {instance.rows.map(({ cells, getRowProps }) => {
          const props = getRowProps()

          return (
            <tr key={props.id} {...props}>
              {cells.map(cell => {
                if (cell.colSpan === 0) {
                  return null
                }

                return (
                  <td key={cell.id} rowSpan={cell.rowSpan} colSpan={cell.colSpan} style={{ border: '1px solid grey' }}>
                    {cell.render({ cellProps: cell })}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          {instance.footers?.map(cell => {
            return (
              <th key={cell.id} rowSpan={cell.rowSpan} colSpan={cell.colSpan} style={{ border: '1px solid grey' }}>
                {cell.render({ cellProps: cell })}
              </th>
            )
          })}
        </tr>
      </tfoot>
    </table>
  )
}

interface MockDataType {
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

const mockDataset: MockDataType[] = [{
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

const rendererModel: RendererModel<MockDataType> = [
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
        footer: [() => <>{sum(mockDataset.map(x => x.amount))}</>],
      },
      {
        accessor: 'cancelAmount',
        label: 'Canceled',
        footer: [() => <>{sum(mockDataset.map(x => x.cancelAmount))}</>],
      },
    ],
  },
  {
    label: 'PAY METHOD',
    accessor: [
      {
        label: 'CARD',
        accessor: [
          {
            label: 'PLCC',
            accessor: 'plcc',
          },
          {
            label: 'DEBIT',
            accessor: 'debit',
            footer: [() => <>{sum(mockDataset.map(x => x.debit))}</>],
          },
        ],
      },
      {
        label: 'TRANSFER',
        accessor: 'transfer',
      },
    ],
  },
  {
    label: 'TRANSACTION ID',
    accessor: 'meta.transactionId',
  },
]
