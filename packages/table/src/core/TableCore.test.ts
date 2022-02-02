import { TableCore } from '..'
import { paymentDataset, paymentDatasetWithSum } from '../mocks/payments.mock'
import { paymentsTableModel } from '../mocks/paymentsTableModel.mock'

describe('let instance = new TableCore(model, { source })', () => {
  const instance = new TableCore(paymentsTableModel, {
    source: paymentDataset,
  })

  describe('instance.generate()', () => {
    const { theadGroups, rows, tfoots, headerMap } = instance.generate()

    describe('return theadGroups', () => {

      it('return theadGroups which have 3 length (3 is largest depth of generated table)', () => {
        expect(theadGroups.length).toBe(3)
      })

      test('check first HeaderGroup', () => {
        expect(theadGroups[0].theads.length).toBe(8)

        const [DATE, ID, SUB_ID, AMOUNT, BUYER, PAY_METHOD, TRANSACTION_ID, MESSAGE] = theadGroups[0].theads

        expect(DATE.label).toBe('Date')
        expect(DATE.rowSpan).toBe(3)
        expect(DATE.colSpan).toBe(1)

        expect(ID.label).toBe('Id')
        expect(ID.rowSpan).toBe(3)
        expect(ID.colSpan).toBe(1)

        expect(SUB_ID.label).toBe('Sub Id')
        expect(SUB_ID.rowSpan).toBe(3)
        expect(SUB_ID.colSpan).toBe(1)

        expect(AMOUNT.label).toBe('AMOUNT')
        expect(AMOUNT.rowSpan).toBe(1)
        expect(AMOUNT.colSpan).toBe(2)

        expect(BUYER.label).toBe('Buyer')
        expect(BUYER.rowSpan).toBe(3)
        expect(BUYER.colSpan).toBe(1)

        expect(PAY_METHOD.label).toBe('PAY METHOD')
        expect(PAY_METHOD.rowSpan).toBe(1)
        expect(PAY_METHOD.colSpan).toBe(3)

        expect(TRANSACTION_ID.label).toBe('Transaction Id')
        expect(TRANSACTION_ID.rowSpan).toBe(3)
        expect(TRANSACTION_ID.colSpan).toBe(1)

        expect(MESSAGE.label).toBe('Message')
        expect(MESSAGE.rowSpan).toBe(3)
        expect(MESSAGE.colSpan).toBe(1)
      })

      test('check second HeaderGroup', () => {
        expect(theadGroups[1].theads.length).toBe(4)

        const [PAID, CANCELED, CARD, TRANSFER] = theadGroups[1].theads

        expect(PAID.label).toBe('Paid')
        expect(PAID.rowSpan).toBe(2)
        expect(PAID.colSpan).toBe(1)

        expect(CANCELED.label).toBe('Canceled')
        expect(CANCELED.rowSpan).toBe(2)
        expect(CANCELED.colSpan).toBe(1)

        expect(CARD.label).toBe('CARD')
        expect(CARD.rowSpan).toBe(1)
        expect(CARD.colSpan).toBe(2)

        expect(TRANSFER.label).toBe('Transfer')
        expect(TRANSFER.rowSpan).toBe(2)
        expect(TRANSFER.colSpan).toBe(1)
      })

      test('check third HeaderGroup', () => {
        expect(theadGroups[2].theads.length).toBe(2)

        const [PLCC, DEBIT] = theadGroups[2].theads

        expect(PLCC.label).toBe('Plcc')
        expect(PLCC.rowSpan).toBe(1)
        expect(PLCC.colSpan).toBe(1)

        expect(DEBIT.label).toBe('Debit')
        expect(DEBIT.rowSpan).toBe(1)
        expect(DEBIT.colSpan).toBe(1)
      })
    })

    describe('return rows', () => {
      it('rows have 7 length', () => {
        expect(rows.length).toBe(7)
      })

      const [firstRow, secondRow, thirdRow, fourthRow, fifthRow] = rows

      test('first row have cells,', () => {
        expect(firstRow.cells.length).toBe(11)

        const [DATE, ID, SUB_ID, PAID, CANCELED, BUYER, PLCC, DEBIT, TRANSFER, TRANSACTION_ID, MESSAGE] = firstRow.cells

        expect(DATE.label).toBe('Date')
        expect(DATE.rowSpan).toBe(4)
        expect(DATE.colSpan).toBe(1)

        expect(ID.label).toBe('Id')
        expect(ID.rowSpan).toBe(3)
        expect(ID.colSpan).toBe(1)

        expect(SUB_ID.label).toBe('Sub Id')
        expect(SUB_ID.rowSpan).toBe(2)
        expect(SUB_ID.colSpan).toBe(1)

        ;[BUYER, PAID, CANCELED, PLCC, DEBIT, TRANSFER, TRANSACTION_ID].forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })

        expect(TRANSACTION_ID.label).toBe('Transaction Id')
        expect(MESSAGE.label).toBe('Message')
      })

      test('second row have cells,', () => {
        expect(secondRow.cells.length).toBe(8)
        expect(secondRow.cells[0].label).toBe('Paid')
        secondRow.cells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })

      test('third row have cells,', () => {
        expect(thirdRow.cells.length).toBe(9)
        expect(thirdRow.cells[0].label).toBe('Sub Id')
        thirdRow.cells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })

      test('fourth row have cells,', () => {
        expect(fourthRow.cells.length).toBe(10)
        expect(fourthRow.cells[0].label).toBe('Id')
        fourthRow.cells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })

      test('fifth row have cells,', () => {
        expect(fifthRow.cells.length).toBe(11)
        expect(fifthRow.cells[0].label).toBe('Date')

        const [DATE, ...restCells] = fifthRow.cells

        expect(DATE.label).toBe('Date')
        expect(DATE.rowSpan).toBe(2)
        expect(DATE.colSpan).toBe(1)

        restCells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })
    })

    describe('return tfoots', () => {
      expect(tfoots!.length).toBe(8)

      const [TOTAL, PAID, CANCELED, EMPTY, PLCC, DEBIT, TRANSFER, REST] = tfoots!

      expect(TOTAL.colSpan).toBe(3)
      expect(PAID.colSpan).toBe(1)
      expect(CANCELED.colSpan).toBe(1)
      expect(EMPTY.colSpan).toBe(1)
      expect(PLCC.colSpan).toBe(1)
      expect(DEBIT.colSpan).toBe(1)
      expect(TRANSFER.colSpan).toBe(1)
      expect(REST.colSpan).toBe(2)
    })

    describe('return headerMap', () => {
      test('check headerMap', () => {
        expect(headerMap.date.label).toBe('Date')
        expect(headerMap.date.show).toBe(true)
        expect(headerMap.date.countOfChild).toBe(0)
        expect(headerMap.date.countOfParent).toBe(0)

        expect(headerMap.id.label).toBe('Id')
        expect(headerMap.id.show).toBe(true)
        expect(headerMap.id.countOfChild).toBe(0)
        expect(headerMap.id.countOfParent).toBe(0)

        expect(headerMap.subId.label).toBe('Sub Id')
        expect(headerMap.subId.show).toBe(true)
        expect(headerMap.subId.countOfChild).toBe(0)
        expect(headerMap.subId.countOfParent).toBe(0)

        expect(headerMap['amount+cancelAmount'].label).toBe('AMOUNT')
        expect(headerMap['amount+cancelAmount'].show).toBe(true)
        expect(headerMap['amount+cancelAmount'].countOfChild).toBe(1)
        expect(headerMap['amount+cancelAmount'].countOfParent).toBe(0)

        expect(headerMap.amount.label).toBe('Paid')
        expect(headerMap.amount.show).toBe(true)
        expect(headerMap.amount.countOfChild).toBe(0)
        expect(headerMap.amount.countOfParent).toBe(1)

        expect(headerMap.cancelAmount.label).toBe('Canceled')
        expect(headerMap.cancelAmount.show).toBe(true)
        expect(headerMap.cancelAmount.countOfChild).toBe(0)
        expect(headerMap.cancelAmount.countOfParent).toBe(1)

        expect(headerMap.buyer.label).toBe('Buyer')
        expect(headerMap.buyer.show).toBe(true)
        expect(headerMap.buyer.countOfChild).toBe(0)
        expect(headerMap.buyer.countOfParent).toBe(0)

        expect(headerMap['plcc+debit+transfer'].label).toBe('PAY METHOD')
        expect(headerMap['plcc+debit+transfer'].show).toBe(true)
        expect(headerMap['plcc+debit+transfer'].countOfChild).toBe(2)
        expect(headerMap['plcc+debit+transfer'].countOfParent).toBe(0)

        expect(headerMap['plcc+debit'].label).toBe('CARD')
        expect(headerMap['plcc+debit'].show).toBe(true)
        expect(headerMap['plcc+debit'].countOfChild).toBe(1)
        expect(headerMap['plcc+debit'].countOfParent).toBe(1)

        expect(headerMap['plcc'].label).toBe('Plcc')
        expect(headerMap['plcc'].show).toBe(true)
        expect(headerMap['plcc'].countOfChild).toBe(0)
        expect(headerMap['plcc'].countOfParent).toBe(2)

        expect(headerMap['debit'].label).toBe('Debit')
        expect(headerMap['debit'].show).toBe(true)
        expect(headerMap['debit'].countOfChild).toBe(0)
        expect(headerMap['debit'].countOfParent).toBe(2)

        expect(headerMap['transfer'].label).toBe('Transfer')
        expect(headerMap['transfer'].show).toBe(true)
        expect(headerMap['transfer'].countOfChild).toBe(0)
        expect(headerMap['transfer'].countOfParent).toBe(1)

        expect(headerMap['meta.transactionId'].label).toBe('Transaction Id')
        expect(headerMap['meta.transactionId'].show).toBe(true)
        expect(headerMap['meta.transactionId'].countOfChild).toBe(0)
        expect(headerMap['meta.transactionId'].countOfParent).toBe(0)

        expect(headerMap['message'].label).toBe('Message')
        expect(headerMap['message'].show).toBe(true)
        expect(headerMap['message'].countOfChild).toBe(0)
        expect(headerMap['message'].countOfParent).toBe(0)
      })
    })
  })

  describe('instance.updateHeaders([\'date\']).generate()', () => {
    const { theadGroups, visibleHeaderIds, tfoots } = instance.updateHeader(['date']).generate()

    it('return single column instance with only \'date\' header', () => {
      expect(visibleHeaderIds).toEqual(['date'])
      expect(theadGroups.length).toBe(1)
      expect(theadGroups[0].getRowProps().rowSpan).toBe(1)
      expect(theadGroups[0].theads.length).toBe(1)

      const [DATE] = theadGroups[0].theads

      expect(DATE.label).toBe('Date')
      expect(DATE.rowSpan).toBe(1)
      expect(DATE.colSpan).toBe(1)
    })

    it('return single footer', () => {
      expect(tfoots?.length).toBe(1)
      expect(tfoots?.[0].rowSpan).toBe(1)
    })
  })

  describe('instance.updateHeaders([\'id\', \'buyer\'\'transfer\']).generate()', () => {
    const { theadGroups, visibleHeaderIds, tfoots } = instance.updateHeader(['id', 'buyer', 'transfer']).generate()

    it('return 2 depth column', () => {
      expect(visibleHeaderIds).toEqual(['id', 'buyer', 'transfer'])
      expect(theadGroups.length).toBe(2)

      const [firstGroup, secondHeader] = theadGroups

      expect(firstGroup.getRowProps().rowSpan).toBe(2)
      expect(firstGroup.theads.length).toBe(3)
      expect(secondHeader.theads.length).toBe(1)

      const [ID, BUYER, PAY_METHOD] = firstGroup.theads

      expect(ID.label).toBe('Id')
      expect(ID.rowSpan).toBe(2)
      expect(ID.colSpan).toBe(1)

      expect(BUYER.label).toBe('Buyer')
      expect(BUYER.rowSpan).toBe(2)
      expect(BUYER.colSpan).toBe(1)

      expect(PAY_METHOD.label).toBe('PAY METHOD')
      expect(PAY_METHOD.rowSpan).toBe(1)
      expect(PAY_METHOD.colSpan).toBe(1)

      const [TRANSFER] = secondHeader.theads

      expect(TRANSFER.label).toBe('Transfer')
      expect(TRANSFER.rowSpan).toBe(1)
      expect(TRANSFER.colSpan).toBe(1)
    })

    it('return 2 length tfoots', () => {
      expect(tfoots?.length).toBe(2)

      const [first, second] = tfoots ?? []

      expect(first.accessor).toBeNull()
      expect(first.colSpan).toBe(2)
      expect(first.rowSpan).toBe(1)

      expect(second.accessor).toBe('transfer')
      expect(second.colSpan).toBe(1)
      expect(second.rowSpan).toBe(1)
    })
  })

  describe('instance.updateSource(filtered)', () => {
    const filtered = paymentDataset.filter(x => x.buyer === 'Jbee')
    const { rows } = instance.updateSource(filtered).generate()

    it('return one row', () => {
      expect(rows.length).toBe(1)
    })
  })

  describe('instance.updateSource() // Flush source', () => {
    const { rows } = instance.updateSource().generate()

    it('return empty row', () => {
      expect(rows.length).toBe(0)
    })
  })
})

describe('let instance = new TableCore(model, { defaultHeaderIds }) // with default Headers', () => {
  describe('defaultHeaderIds: [\'date\']', () => {
    const instance = new TableCore(paymentsTableModel, {
      defaultHeaderIds: ['date'],
    })
    const { theadGroups, tfoots } = instance.generate()

    it('have single column with only \'date\' header', () => {

      expect(theadGroups.length).toBe(1)
      expect(theadGroups[0].getRowProps().rowSpan).toBe(1)
      expect(theadGroups[0].theads.length).toBe(1)

      const [DATE] = theadGroups[0].theads

      expect(DATE.label).toBe('Date')
      expect(DATE.rowSpan).toBe(1)
      expect(DATE.colSpan).toBe(1)
    })

    it('return single footer', () => {
      expect(tfoots?.length).toBe(1)
      expect(tfoots?.[0].rowSpan).toBe(1)
    })
  })

  describe('defaultHeaderIds: [\'id\', \'transfer\']', () => {
    const instance = new TableCore(paymentsTableModel, {
      defaultHeaderIds: ['id', 'transfer'],
    })
    const { theadGroups } = instance.generate()

    test('changed largest depth by headerIds: 3 -> 2', () => {
      expect(theadGroups.length).toBe(2)

      const [firstGroup, secondHeader] = theadGroups

      expect(firstGroup.getRowProps().rowSpan).toBe(2)
      expect(firstGroup.theads.length).toBe(2)
      expect(secondHeader.theads.length).toBe(1)

      const [ID, PAY_METHOD] = firstGroup.theads

      expect(ID.label).toBe('Id')
      expect(ID.rowSpan).toBe(2)
      expect(ID.colSpan).toBe(1)

      expect(PAY_METHOD.label).toBe('PAY METHOD')
      expect(PAY_METHOD.rowSpan).toBe(1)
      expect(PAY_METHOD.colSpan).toBe(1)

      const [TRANSFER] = secondHeader.theads

      expect(TRANSFER.label).toBe('Transfer')
      expect(TRANSFER.rowSpan).toBe(1)
      expect(TRANSFER.colSpan).toBe(1)
    })
  })
})

describe('let instance = new TableCore(model) // without source', () => {
  const instance = new TableCore(paymentsTableModel, {})

  describe('instance.generate()', () => {
    const { rows } = instance.generate()

    it('return empty row', () => {
      expect(rows.length).toBe(0)
    })
  })
})

describe('let instance = new TableCore(model, { source: composeRow(data) })', () => {
  const instance = new TableCore(paymentsTableModel, {
    source: paymentDatasetWithSum,
  })

  describe('instance.generate()', () => {
    const { rows } = instance.generate()

    describe('return rows', () => {
      const [, , , , , , seventhRow] = rows

      test('check seventhRow', () => {
        const [TOTAL, SUB_ID] = seventhRow.cells

        expect(TOTAL.label).toBe('Id')
        expect(TOTAL.colSpan).toBe(2)
        expect(SUB_ID.label).toBe('Sub Id')
        expect(SUB_ID.colSpan).toBe(0)
      })
    })
  })
})
