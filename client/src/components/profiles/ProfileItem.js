import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    county,
    subCounty,
    ward,
    location,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{county && <span>at {county}</span>}</p>
        <p className='my-1'>{subCounty && <span>{subCounty}</span>}</p>
        <p className='my-1'>{ward && <span>{ward}</span>}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
