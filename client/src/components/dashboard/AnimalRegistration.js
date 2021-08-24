import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formatDate from '../../utils/formatDate'
import { deleteAnimalRegistration } from '../../actions/profile'

const AnimalRegistration = ({
  animalRegistration,
  deleteAnimalRegistration,
}) => {
  const animalRegistrations = animalRegistration.map((reg) => (
    <tr key={reg._id}>
      <td>{reg.regNumber}</td>
      <td>{reg.breed}</td>
      <td>{reg.sex}</td>
      <td>{formatDate(reg.dob)}</td>
      <td>{reg.idNo}</td>
      <td>
        <button
          onClick={() => deleteAnimalRegistration(reg._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className='my-2'>Animal Registration Details</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th className='hide-sm'>Breed</th>
            <th className='hide-sm'>Sex</th>
            <th className='hide-sm'>Date of Birth</th>
            <th className='hide-sm'>Identification Number</th>
            <th />
          </tr>
        </thead>
        <tbody>{animalRegistrations}</tbody>
      </table>
    </Fragment>
  )
}

AnimalRegistration.propTypes = {
  animalRegistration: PropTypes.array.isRequired,
  deleteAnimalRegistration: PropTypes.func.isRequired,
}

export default connect(null, { deleteAnimalRegistration })(AnimalRegistration)
