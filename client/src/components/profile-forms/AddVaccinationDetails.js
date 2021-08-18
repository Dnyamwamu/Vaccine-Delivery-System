import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addVaccinationDetails } from '../../actions/profile'

const AddVaccinationDetails = ({ addVaccinationDetails, history }) => {
  const [formData, setFormData] = useState({
    vaccineName: '',
    noDoses: '',
    vaccineManufacturer: '',
    vaccinationDate: '',
    rateVaccine: '',
  })
  const {
    vaccineName,
    noDoses,
    vaccineManufacturer,
    vaccinationDate,
    rateVaccine,
  } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <Fragment>
      <h1 class='large text-primary'>Add Vaccination Details</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add the vaccination Details
        administered to your animal{' '}
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault()
          addVaccinationDetails(formData, history)
        }}
      >
        <div className='form-group'>
          <select
            name='vaccineName'
            value={vaccineName}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Vaccine Name</option>
            <option value='VAC-1r'>VAC-1r</option>
            <option value='Dor-2v'>Dor-2v</option>
            <option value='PST-1r'>PST-1r</option>
            <option value='XCS-1v'>XCS-1v</option>
          </select>
          <small className='form-text'>Choose the Vaccine Name</small>
        </div>
        <div className='form-group'>
          <select name='noDoses' value={noDoses} onChange={(e) => onChange(e)}>
            <option value='0'>* Number of Doses</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
          <small className='form-text'>Select the number of Doses</small>
        </div>
        <div className='form-group'>
          <select
            name='vaccineManufacturer'
            value={vaccineManufacturer}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select the Vaccine Manufacturer</option>
            <option value='Catvac'>Catvac</option>
            <option value='Johnsons'>Johnsons</option>
            <option value='Pfeizer'>Pfeizer</option>
            <option value='Dairyvac'>Dairyvac</option>
          </select>
          <small className='form-text'>
            Choose the name of the Vaccine Manufacturer
          </small>
        </div>

        <div class='form-group'>
          <h4>Date of Vaccination</h4>
          <input
            type='date'
            name='vaccinationDate'
            value={vaccinationDate}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <select
            name='rateVaccine'
            value={rateVaccine}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Rate the Vaccine </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <small className='form-text'>Rate the Vaccine effectiveness</small>
        </div>

        <input type='submit' class='btn btn-primary my-1' />
        <a class='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  )
}

AddVaccinationDetails.propTypes = {
  addVaccinationDetails: PropTypes.func.isRequired,
}

export default connect(null, { addVaccinationDetails })(
  withRouter(AddVaccinationDetails)
)
