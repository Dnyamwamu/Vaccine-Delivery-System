import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { vaccination } from '../../actions/profile'
import { Link } from 'react-router-dom'

const Vaccination = ({ vaccination, history }) => {
  const [formData, setFormData] = useState({
    vaccineName: '',
    doses: '',
    manufacturer: '',
    date: '',
    rate: '',
  })
  const { vaccineName, doses, manufacturer, date, rate } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <Fragment>
      <h1 className='large text-primary'>Add Vaccination Details</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add the vaccination Details
        administered to your animal{' '}
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault()
          vaccination(formData, history)
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
          <select name='doses' value={doses} onChange={(e) => onChange(e)}>
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
            name='manufacturer'
            value={manufacturer}
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

        <div className='form-group'>
          <h4>Date of Vaccination</h4>
          <input
            type='date'
            name='date'
            value={date}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <select name='rate' value={rate} onChange={(e) => onChange(e)}>
            <option value='0'>* Rate the Vaccine </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <small className='form-text'>Rate the Vaccine effectiveness</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

Vaccination.propTypes = {
  vaccination: PropTypes.func.isRequired,
}

export default connect(null, { vaccination })(withRouter(Vaccination))
