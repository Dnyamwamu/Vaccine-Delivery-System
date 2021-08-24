import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileVaccination = ({
  profile: {
    vaccineName,
    doses,
    manufacturer,
    date,
    rate,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      <Fragment>
        <h2 className='text-primary'>
          {name.trim().split(' ')[0]}s Vaccination Details
        </h2>
        <p>{vaccineName}</p>
        <p>{doses}</p>
        <p>{manufacturer}</p>
        <p>{formatDate(date)}</p>
        <p>{rate}</p>
        <div className='line' />
      </Fragment>
    </div>
  )
}

ProfileVaccination.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileVaccination
