import React from 'react'

const Categories = ({categories}) => {
  return (
    <section className="categories">
      <div className="d-flex row">
        {
          categories && categories.map((category, idx) => {
            return (
              <div className="card category col-2">
                <p className='fw-bold'>{category.amount} €</p>
                <p>{category.label}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Categories