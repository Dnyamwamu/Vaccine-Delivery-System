import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileAnimalRegistration = ({
  profile: {
    regNumber,
    breed,
    dob,
    idNo,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      <Fragment>
        <h2 className='text-primary'>
          {name.trim().split(' ')[0]}s Vaccination Details
        </h2>
        <p>{regNumber}</p>
        <p>{breed}</p>
        <p>{idNo}</p>
        <p>{formatDate(dob)}</p>

        <div className='line' />
      </Fragment>
    </div>
  )
}

ProfileAnimalRegistration.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAnimalRegistration
