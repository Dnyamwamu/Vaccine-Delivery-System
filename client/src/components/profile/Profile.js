import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileVaccination from './ProfileVaccination'
import ProfileAnimalRegistration from './ProfileAnimalRegistration'

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Vaccination</h2>
              {profile.vaccination.length > 0 ? (
                <Fragment>
                  {profile.vaccination.map((vaccination) => (
                    <ProfileVaccination
                      key={vaccination._id}
                      vaccination={vaccination}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Vaccination performed</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Animal Registration</h2>
              {profile.animalRegistration.length > 0 ? (
                <Fragment>
                  {profile.animalRegistration.map((animalRegistration) => (
                    <ProfileAnimalRegistration
                      key={animalRegistration._id}
                      animalRegistration={animalRegistration}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Animal Registered</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})
export default connect(mapStateToProps, { getProfileById })(Profile)
