import React, { useContext, useEffect, useState } from 'react'
import { Transaction } from '../../interfaces'
import Table from 'react-bootstrap/Table'
import { TransactionContext } from '../../App'

// interface TransactionsProps {
//   transactions?: Transaction[]
// }

interface TransactionsByDate {
  [date: string]: Partial<Transaction>[]
}

const TransactionsList = () => {

  const transactions = useContext(TransactionContext);
  const [transactionsByDate, setTransactionsByDate] = useState<TransactionsByDate | undefined>(undefined)
  
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const transactionsByDate: TransactionsByDate = {}
      transactions?.forEach(transaction => {
        const date: string = transaction.date
        if (!transactionsByDate[date]) {
          transactionsByDate[date] = []
        }
        transactionsByDate[date].push({
          id: transaction.id,
          name: transaction.name,
          category: transaction.category,
          amount: transaction.amount
        })
      })
      setTransactionsByDate(transactionsByDate)
    }
  }, [transactions])
  
  return (
    <section className="transactions">
      <p>Résultats {transactionsByDate && Object.keys(transactionsByDate).length}</p>
      {
        transactionsByDate && Object.keys(transactionsByDate).map((date, idx) => {
          return (
            <div className='transactions-by-date' key={idx}>
              <p>{date}</p>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className='w-25'>Name</th>
                    <th className='w-50'>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className='transactions-list'>
                  {
                    transactionsByDate[date].map((transaction, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{transaction.id}</td>
                          <td>{transaction.name}</td>
                          <td>{transaction.category}</td>
                          <td className={transaction.amount && transaction.amount < 0 ? 'text-danger' : 'text-success'}>{transaction.amount} €</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>

            </div>
          )
        })
      }
    </section>
  )
}

export default TransactionsList