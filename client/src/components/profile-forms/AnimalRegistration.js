import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { animalRegistration } from '../../actions/profile'

const AnimalRegistration = ({ animalRegistration, history }) => {
  const [formData, setFormData] = useState({
    regNumber: '',
    breed: '',
    idNo: '',
    sex: '',
    dob: '',
  })
  const { regNumber, breed, idNo, sex, dob } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <Fragment>
      <h1 className='large text-primary'>Animal Registration</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add the animal Details{' '}
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault()
          animalRegistration(formData, history)
        }}
      >
        <div className='form-group'>
          <select
            name='regNumber'
            value={regNumber}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Registration Number</option>
            <option value='VAC-1r'>VAC-1r</option>
            <option value='Dor-2v'>Dor-2v</option>
            <option value='PST-1r'>PST-1r</option>
            <option value='XCS-1v'>XCS-1v</option>
          </select>
          <small className='form-text'>Choose the Vaccine Name</small>
        </div>
        <div className='form-group'>
          <select name='breed' value={breed} onChange={(e) => onChange(e)}>
            <option value='0'>* Animal Breed</option>
            <option value='VAC-1r'>VAC-1r</option>
            <option value='Dor-2v'>Dor-2v</option>
            <option value='PST-1r'>PST-1r</option>
            <option value='XCS-1v'>XCS-1v</option>
          </select>
          <small className='form-text'>Select the Animal Breed</small>
        </div>
        <div className='form-group'>
          <select name='sex' value={sex} onChange={(e) => onChange(e)}>
            <option value='0'>* Select the Gender of the Animal</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          <small className='form-text'>Choose the Animal gender</small>
        </div>

        <div className='form-group'>
          <h4>Date of Birth</h4>
          <input
            type='date'
            name='dob'
            value={dob}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <select name='idNo' value={idNo} onChange={(e) => onChange(e)}>
            <option value='0'>* Identification Number </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <small className='form-text'>Animal's ID</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  )
}

AnimalRegistration.propTypes = {
  animalRegistration: PropTypes.func.isRequired,
}

export default connect(null, { animalRegistration })(
  withRouter(AnimalRegistration)
)
