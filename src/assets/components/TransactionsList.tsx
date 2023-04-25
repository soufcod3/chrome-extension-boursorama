import React, { useContext, useEffect, useRef, useState } from 'react'
import { Transaction } from '../../interfaces'
// import Table from 'react-bootstrap/Table'
import { TransactionContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftRotate, faArrowRightRotate, faArrowRotateBack, faArrowRotateLeft, faSave } from '@fortawesome/free-solid-svg-icons'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface TransactionsByDate {
  [date: string]: Omit<Transaction, 'date'>[] // omitting date property
}

const TransactionsList = () => {

  const { transactions, updateTransactions } = useContext(TransactionContext);
  const [transactionsByDate, setTransactionsByDate] = useState<TransactionsByDate | undefined>(undefined)

  //// Building to display transactionsByDate from transaction set
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const transactionsByDate: TransactionsByDate = {}
      transactions.forEach(transaction => {
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

  //// Category Input Value handler
  const handleChange = (e: any, id: number) => {
    if (transactions) {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === id) {
          if (e.target.value !== '') {
            return {
              ...transaction,
              category: e.target.value
            }
          } else {
            return {
              ...transaction,
              category: 'Non catégorisé'
            }
          }
        } else {
          return transaction
        }
      })
      updateTransactions(updatedTransactions)
    }
  }

  useEffect(() => {
    if (transactions && chrome.storage) {
      chrome.storage.local.set({ transactions }).then(res => {
        console.log('Transactions sauvegardées', transactions)
      })
    }
  }, [transactions])

  const [shownCategoryInputs, setShownCategoryInputs] = useState<number[]>([])
  const handleShowCategoryInput = (id: number) => {
    setShownCategoryInputs([...shownCategoryInputs, id])
  }

  const handleCancel = (id: number) => {
    console.log('hey')
    console.log(chrome.storage.local.get('transactions'))
  }

  //// Click outside input handler
  const inputRef = useRef<HTMLTableDataCellElement>(null)
  useEffect(() => {
    let handler = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target) && event.target.tagName !== 'INPUT') {
        setShownCategoryInputs([])
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return (
    <section className="transactions">
      <p className='text-3xl font-bold underline'>Résultats {transactionsByDate && Object.keys(transactionsByDate).length}</p>
      {
        transactionsByDate && Object.keys(transactionsByDate).map((date, idx) => {
          return (
            <div className='transactions-by-date overflow-x-auto' key={idx}>
              <p>{date}</p>
              <table className='table table-compact w-full'>
                <thead>
                  <tr>
                    <th></th>
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
                          <td onClick={() => handleShowCategoryInput(transaction.id)} ref={inputRef}>
                            {
                              shownCategoryInputs.includes(transaction.id) ?
                                <div className='d-flex'>
                                  <input className='w-100 d-flex align-items-center' type="text" value={transaction.category} onChange={(e) => handleChange(e, transaction.id)} />
                                  <FontAwesomeIcon icon={faArrowLeftRotate} onClick={() => handleCancel(transaction.id)}/>
                                </div>
                                :
                                transaction.category
                            }
                          </td>
                          <td className={transaction.amount && transaction.amount < 0 ? 'text-danger' : 'text-success'}>{transaction.amount} €</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

            </div>
          )
        })
      }
    </section>
  )
}

export default TransactionsList