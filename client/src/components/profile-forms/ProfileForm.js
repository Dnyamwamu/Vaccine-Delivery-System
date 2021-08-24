import React, { Fragment, useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const initialState = {
  county: '',
  subCounty: '',
  ward: '',
  village: '',
  email: '',
}

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState)

  const creatingProfile = useRouteMatch('/create-profile')

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  useEffect(() => {
    if (!profile) getCurrentProfile()
    if (!loading && profile) {
      const profileData = { ...initialState }
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key]
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key]
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ')
      setFormData(profileData)
    }
  }, [loading, getCurrentProfile, profile])

  const { county, subCounty, ward, village, email } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, history, profile ? true : false)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>
        {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>

      <p className='lead'>
        <i className='fas fa-user'></i>{' '}
        {creatingProfile
          ? ` Let's get some information to make your`
          : ' Add some changes to your profile'}
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
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
            name='sub-county'
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
          <small className='form-text'>Insert your Village</small>
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Current Location (GPS)
          </button>
        </div>
        <div className='form-group' value={email} onChange={(e) => onChange(e)}>
          <input type='text' placeholder='Email' name='email' />
          <small className='form-text'>
            Enter your Email address (Optional)
          </small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
)
