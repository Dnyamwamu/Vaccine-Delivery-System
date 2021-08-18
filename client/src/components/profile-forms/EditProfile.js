import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    county: '',
    subCounty: '',
    ward: '',
    village: '',
    email: '',
  })
  useEffect(() => {
    getCurrentProfile()
    setFormData({
      county: loading || !profile.county ? '' : profile.county,
      subCounty: loading || !profile.subCounty ? '' : profile.subCounty,
      ward: loading || !profile.ward ? '' : profile.ward,
      village: loading || !profile.village ? '' : profile.village,
      email: loading || !profile.email ? '' : profile.email,
    })
  }, [loading, getCurrentProfile])
  const { county, subCounty, ward, village, email } = formData

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, history, true)
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's edit some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onsubmit(e)}>
        <div className='form-group'>
          <select name='county' value={county} onChange={(e) => onChange(e)}>
            <option value='0'>* Select County</option>
            <option value='Mombasa'>Mombasa</option>
            <option value='Kajiado'>Kajiado</option>
            <option value='Kilifi'>Kilifi</option>
            <option value='Nairobi'>Nairobi</option>
            <option value='Uasin'>Uasin Gishu</option>
            <option value='WestPokot'>West-Pokot</option>
            <option value='Nyandarua'>Nyandarua</option>
            <option value='Kiambu'>Kiambu</option>
          </select>
          <small className='form-text'>Choose your County of Residence</small>
        </div>
        <div className='form-group'>
          <select
            name='subCounty'
            value={subCounty}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Sub-County</option>
            <option value='Mombasa'>Mombasa</option>
            <option value='Kajiado'>Kajiado</option>
            <option value='Kilifi'>Kilifi</option>
            <option value='Nairobi'>Nairobi</option>
            <option value='Uasin'>Uasin Gishu</option>
            <option value='WestPokot'>West-Pokot</option>
            <option value='Nyandarua'>Nyandarua</option>
            <option value='Kiambu'>Kiambu</option>
          </select>
          <small className='form-text'>
            Choose your Sub-County of Residence
          </small>
        </div>

        <div className='form-group'>
          <select name='ward' value={ward} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Ward</option>
            <option value='Mombasa'>Mombsa</option>
            <option value='Kajiado'>Kajiado</option>
            <option value='Kilifi'>Kilifi</option>
            <option value='Nairobi'>Nairobi</option>
            <option value='Uasin'>Uasin Gishu</option>
            <option value='WestPokot'>West-Pokot</option>
            <option value='Nyandarua'>Nyandarua</option>
            <option value='Kiambu'>Kiambu</option>
          </select>
          <small className='form-text'>Choose your Ward of Residence</small>
        </div>
        <div
          className='form-group'
          value={village}
          onChange={(e) => onChange(e)}
        >
          <input type='text' placeholder='Village' name='village' />
          <small class='form-text'>Insert your Village</small>
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Current Location
          </button>
        </div>
        <div class='form-group' value={email} onChange={(e) => onChange(e)}>
          <input type='text' placeholder='Email' name='email' />
          <small class='form-text'>Enter your Email address (Optional)</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
)
