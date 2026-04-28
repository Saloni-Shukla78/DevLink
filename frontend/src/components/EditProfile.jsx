import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = (userData) => {
  const user = userData?.user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [headline, setHeadline] = useState(user.headline);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveProfile = async () => {
    try { 
      const res = await axios.patch(  
        Base_url + "/profile/edit",
        { firstName, lastName, about, age, headline, skills, photoUrl, gender },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl border p-7">
        {/* <legend className="fieldset-legend">Edit Profile</legend> */}
        <h2 className="text-2xl font-bold text-center text-success mb-4">
          Edit Profile
        </h2>

        <div className="flex gap-4">
          <div className="">
            <label className="label text-sm">First Name :</label>
            <input
              type="text"
              value={firstName}
              name="firstName"
              className="input input-bordered w-full focus:outline-none focus:ring-0 mt-2"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="label text-sm">Last Name:</label>
            <input
              type="text"
              value={lastName}
              name="lastName"
              className="input input-bordered w-full focus:outline-none focus:ring-0 mt-2"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="label text-sm">Gender:</label>
            <select
              className="select select-bordered w-full mt-2 
  focus:outline-none focus:ring-0 focus:border-base-300 
  focus-visible:outline-none focus-visible:ring-0 
  appearance-none"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled={true}>Select the gender</option>
              <option>male</option>
              <option>female</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="label text-sm">Age:</label>
            <input
              type="number"
              value={age}
              name="age"
              className="input input-bordered w-full focus:outline-none focus:ring-0 mt-2"
              placeholder="age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <label className="label text-sm">About:</label>
        <input
          type="text"
          value={about}
          name="about"
          className="input input-bordered w-full focus:outline-none focus:ring-0 mt-2"
          placeholder="About"
          onChange={(e) => setAbout(e.target.value)}
        />

        <label className="label text-sm">Headline:</label>
        <input
          type="text"
          value={headline}
          name="headline"
          className="input input-bordered w-full focus:outline-none focus:ring-0 mt-2"
          placeholder="Headline"
          onChange={(e) => setHeadline(e.target.value)}
        />

        <label className="label text-sm">PhotoUrl:</label>
        <input
          type="text"
          value={photoUrl}
          name="photoUrl"
          className="input input-bordered w-full focus:outline-none focus:ring-0 mt-2"
          placeholder="photoUrl"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <label className="label text-sm">Skills:(Seperated by comma)</label>
        <input
          type="text"
          value={skills}
          name="skills"
          className="input input-bordered w-full focus:outline-none focus:ring-0 mt-2"
          placeholder="skills"
          onChange={(e) => setSkills(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button className="btn btn-success mt-4" onClick={saveProfile}>
          Save Profile
        </button>
        
      </fieldset>
      {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile Updated successfully.</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default EditProfile;
