import React, { useEffect } from 'react'
import { JsonData } from '../../interfaces'
import Table from 'react-bootstrap/Table'

interface MovementsProps {
  data: JsonData,
  categories: string[]
}

const Movements = ({ data, categories }: MovementsProps) => {

  return (
    <section className="results">
      <hr />

      <p className='h3 mb-4'>Résultats ({data.count})</p>
      {
        data.data.map((movementsByDate, idx) => {
          return (
            <div key={idx}>
              <p className='fw-bold mb-3'>{movementsByDate.date}</p>
              <Table striped hover size="sm" variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Catégorie</th>
                    <th>Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    movementsByDate.movements.map((movement, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx}</td>
                          <td className='w-50'>{movement.name}</td>
                          <td className='w-25'>{movement.category}</td>
                          <td>{movement.amount}</td>
                        </tr>
                      )
                    }
                    )}
                </tbody>
              </Table>
            </div>
          )
        })
      }
    </section>
  )
}

export default Movements