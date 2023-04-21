import React, { useEffect, useState } from 'react'
import { Transaction } from '../../interfaces'
import Table from 'react-bootstrap/Table'

interface TransactionsProps {
  transactions?: Transaction[]
}

interface transactionsByDate {
  [date: string]: Partial<Transaction>[]
}

const TransactionsList = ({ transactions }: TransactionsProps) => {

  const transactionsByDate: transactionsByDate = {}
  
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

  console.log('transactionsByDate', transactionsByDate)

  return (
    <section className="transactions">
      {
        Object.keys(transactionsByDate).map(date => {
          return (
            <>
              <p>{date}</p>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    transactionsByDate[date].map(transaction => {
                      return (
                        <tr>
                          <td>{transaction.id}</td>
                          <td>{transaction.name}</td>
                          <td>{transaction.category}</td>
                          <td className={transaction.amount < 0 ? 'text-danger' : 'text-success'}>{transaction.amount} €</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>

            </>
          )
        })
      }
    </section>
  )
}

export default TransactionsList