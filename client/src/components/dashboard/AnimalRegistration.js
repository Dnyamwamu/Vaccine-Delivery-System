import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

const AnimalRegistration = ({ animalRegistration }) => {
  const animalRegistrations = animalRegistration.map((reg) => (
    <tr key={reg._id}>
      <td>{reg.regNumber}</td>
      <td>{reg.breed}</td>
      <td>{reg.sex}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{reg.dob}</Moment>
      </td>
      <td>{reg.idNo}</td>
      <td>
        <button className='btn btn-danger'>Delete</button>
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
}

export default connect()(AnimalRegistration)
