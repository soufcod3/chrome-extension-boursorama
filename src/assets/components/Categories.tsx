import React, { useContext } from 'react'
import { TransactionContext } from '../../App'

const Categories = () => {

  const transactions = useContext(TransactionContext)

  console.log('transactions from categories', transactions)

  return (
    <section className='categories'>
      Catégories
    </section>
  )
}

export default Categories