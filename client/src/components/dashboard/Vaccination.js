import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

const Vaccination = ({ vaccination }) => {
  const vaccinations = vaccination.map((vac) => (
    <tr key={vac._id}>
      <td>{vac.vaccine}</td>
      <td>{vac.doses}</td>
      <td>{vac.manufacturer}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{vac.date}</Moment>
      </td>
      <td>{vac.rate}</td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className='my-2'>Vaccination Details</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th className='hide-sm'>Number of Doses</th>
            <th className='hide-sm'>Manufacturer</th>
            <th className='hide-sm'>Date</th>
            <th className='hide-sm'>Rate</th>
            <th />
          </tr>
        </thead>
        <tbody>{vaccinations}</tbody>
      </table>
    </Fragment>
  )
}

Vaccination.propTypes = {
  vaccination: PropTypes.array.isRequired,
}

export default connect()(Vaccination)
