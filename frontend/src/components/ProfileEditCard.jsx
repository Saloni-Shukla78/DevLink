import React from 'react'

const ProfileEditCard = ({user}) => {
    const {email, firstName, lastName,headline, about, photoUrl, gender, age ,skills} = user;
  return (
   <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="profile photo"
      className="w-full h-full object-cover" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {firstName +" " + lastName}
      {headline && <div className="badge badge-secondary">{headline}</div>}
    </h2>
    {(age !== undefined || gender) && (<div className="card-actions">
      {age && <div className="badge badge-outline">{age}</div>}
      {gender && <div className="badge badge-outline">{gender}</div>}
    </div>)}
    {about && <div>{about}</div>}
    {skills && <div><span className='font-semibold'>Skills : </span>{skills.join(", ")}</div>}
    <div><span className='font-semibold'>Contact By : </span>{email}</div>
    
  </div>
</div>
  )
}

export default ProfileEditCard
