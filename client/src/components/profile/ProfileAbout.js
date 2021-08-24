import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({
  profile: {
    vaccine,
    doses,
    manufacturer,
    date,
    rate,
    user: { name },
    bio,
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
