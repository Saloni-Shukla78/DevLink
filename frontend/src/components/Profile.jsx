import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import ProfileEditCard from './ProfileEditCard';

const Profile = () => {
  const user=useSelector((store)=>store.user);
  return (
    user && (
      <div className='flex gap-10 m-7 justify-center'>
      <EditProfile user={user}/>
      <ProfileEditCard user={user}/>
    </div>
    )
  );
};

export default Profile
