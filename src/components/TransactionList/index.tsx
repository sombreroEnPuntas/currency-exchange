import React from 'react'
import { useSelector } from 'react-redux'

import { getTransactions } from '../../data/transactions'
import { Transaction } from '../../types'
import formatMoney from '../../utils/formatMoney'
import usePages from '../../utils/usePages'

const TransactionList = () => {
  const transactions: Transaction[] = useSelector(getTransactions)
  const { handleBack, handleNext, page, pageNumber, totalPages } = usePages({
    list: transactions,
    pageSize: 10,
  })

  return (
    <section>
      <header>
        <h2>{'Transactions'}</h2>
      </header>
      <table>
        {page.length === 0 ? (
          <caption>{'No Activity yet.'}</caption>
        ) : (
          <>
            <tfoot>
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  <a role="button" onClick={handleBack}>
                    {'<'}
                  </a>
                  {`${pageNumber}/${totalPages}`}
                  <a role="button" onClick={handleNext}>
                    {'>'}
                  </a>
                </td>
              </tr>
            </tfoot>
            <tbody>
              {page.map(({ from, to, timestamp }) => (
                <tr
                  key={`transaction-${timestamp}-${from.currency}-${to.currency}`}
                >
                  <td>{new Date(timestamp).toLocaleString()}</td>
                  <td>
                    {`${formatMoney(
                      from.amount,
                      from.currency
                    )} \u27A1 ${formatMoney(to.amount, to.currency)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </section>
  )
}

export default TransactionList
