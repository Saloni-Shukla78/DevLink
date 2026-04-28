import React from 'react'

const ProfileEditCard = ({user}) => {
    const {email, firstName, lastName,headline, about, photoUrl, gender, age ,skills} = user;
  return (
   <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="profile photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {firstName +" " + lastName}
      <div className="badge badge-secondary">{headline}</div>
    </h2>
    <div className="card-actions">
      <div className="badge badge-outline">{age}</div>
      <div className="badge badge-outline">{gender}</div>
    </div>
    <p>{about}</p>
    <div><span className='font-semibold'>Skills : </span><span>{skills.join(", ")}</span></div>
    <div><span className='font-semibold'>Contact By : </span><span>{email}</span></div>
    
  </div>
</div>
  )
}

export default ProfileEditCard
