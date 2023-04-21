import React from 'react'
import { Transaction, TransactionsByDate } from '../../interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { TRANSACTIONS } from '../../App'

interface HeaderProps {
  transactions?: Transaction[]
  setTransactions: (data: Transaction[]) => void
  analyze?: () => void
}

const Header = ({ transactions, setTransactions, analyze = undefined }: HeaderProps) => {

  return (
    <section className='header text-center'>
      {
        transactions ?
          <div className='d-flex justify-content-between w-100'>
            {/* <p className='fw-bold'>{data.count} mouvements</p> */}
            <div className='d-flex align-items-center gap-3'>
              {
                analyze ?
                  <button onClick={() => analyze()}><FontAwesomeIcon icon={faRedoAlt} /></button>
                  : 
                  <button onClick={() => setTransactions(TRANSACTIONS)}><FontAwesomeIcon icon={faRedoAlt} /></button>
              }
              <p className='fw-bold'>Logo</p>
            </div>
          </div>
          :
          <>
            <p className='fw-bold'>Logo</p>
            {/* {
              analyze ?
                <button onClick={() => analyze()}>Analyser</button>
                :
                <button onClick={() => setTransactionsByDate(TRANSACTIONS_BY_DATE.data)}>Analyser</button>
            } */}
          </>
      }
    </section>
  )
}

export default Header