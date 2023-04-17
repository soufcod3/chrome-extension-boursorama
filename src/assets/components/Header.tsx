import React from 'react'
import { JsonData } from '../../interfaces'
import { JSON_EXAMPLE } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
  data?: JsonData
  setData: (data: JsonData) => void
  analyze?: () => void
}

const Header = ({ data, setData, analyze = undefined }: HeaderProps) => {

  return (
    <section className='header text-center'>
      {
        data ?
          <div className='d-flex justify-content-between w-100'>
            <p className='fw-bold'>{data.count} mouvements</p>
            <div className='d-flex align-items-center gap-3'>
              {
                analyze ?
                  <button onClick={() => analyze()}><FontAwesomeIcon icon={faRedoAlt} /></button>
                  :
                  <button onClick={() => setData(JSON_EXAMPLE)}><FontAwesomeIcon icon={faRedoAlt} /></button>
              }
              <p className='fw-bold'>Logo</p>
            </div>
          </div>
          :
          <>
            <p className='fw-bold'>Logo</p>
            {
              analyze ?
                <button onClick={() => analyze()}>Analyser</button>
                :
                <button onClick={() => setData(JSON_EXAMPLE)}>Analyser</button>
            }
          </>
      }
    </section>
  )
}

export default Header