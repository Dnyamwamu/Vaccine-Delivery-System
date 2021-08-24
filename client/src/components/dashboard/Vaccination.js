import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formatDate from '../../utils/formatDate'
import { deleteVaccination } from '../../actions/profile'

const Vaccination = ({ vaccination = [], deleteVaccination }) => {
  const vaccinations = vaccination.map((vac) => (
    <tr key={vac._id}>
      <td>{vac.vaccineName}</td>
      <td>{vac.doses}</td>
      <td>{vac.manufacturer}</td>
      <td>{formatDate(vac.date)}</td>
      <td>{vac.rate}</td>
      <td>
        <button
          onClick={() => deleteVaccination(vac._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
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
            <th>Number of Doses</th>
            <th>Manufacturer</th>
            <th>Date</th>
            <th>Rate</th>
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
  deleteVaccination: PropTypes.func.isRequired,
}

export default connect(null, { deleteVaccination })(Vaccination)
