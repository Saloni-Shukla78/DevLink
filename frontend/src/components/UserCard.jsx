import { useState }  from "react";
import { Base_url } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, headline, about, photoUrl, gender, age,skills } =
    user;
    console.log(user)
  const [requestError, setRequestError] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("");

    const skillList = skills?.[0]
  ?.split(",")
  .map((s) => s.trim())
  .filter(Boolean) ?? [];

  const handleSendRequest = async (status, id) => {
    if (loadingStatus) return;
    try {
       setRequestError("");
      setLoadingStatus(status);
      await axios.post(
        Base_url + "/request/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      setRequestError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong. Try again."
      );
      setLoadingStatus("");
    }
  };
  const getInitials = () =>
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="m-5">
      <div className="card bg-base-100 w-72 shadow-lg border border-base-200 rounded-2xl overflow-hidden">
        <figure>
          {photoUrl ? (<img src={photoUrl} alt="profile" />) : (
          <span className="text-6xl font-bold text-primary">{getInitials()}</span>
        )}
        </figure>
        <div className="card-body p-5 gap-0">
          <h2 className="card-title text-lg font-bold text-base-content tracking-tight">{firstName + " " + lastName}</h2>
          <p className="text-sm text-base-content/60 mt-0.5 mb-3 flex items-center gap-1.5">{headline || ""}</p>
           {skillList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skillList.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="badge badge-sm bg-primary/10 text-primary border-none font-medium"
              >
                {skill}
              </span>
            ))}
            {skillList.length > 4 && (
              <span className="badge badge-sm bg-base-200 text-base-content/50 border-none">
                +{skillList.length - 4} more
              </span>
            )}
          </div>
        )}
          <div className="card-actions justify-center">
            <button
              onClick={() => handleSendRequest("ignored", user._id)}
              disabled={!!loadingStatus}
              className="btn btn-primary btn-outline rounded-xl gap-1.5 disabled:opacity-50"
            >{loadingStatus === "ignored"
              ? <span className="loading loading-spinner loading-xs" />
              : <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            }Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", user._id)}
               disabled={!!loadingStatus}
                className="btn btn-secondary btn-outline rounded-xl gap-1.5 disabled:opacity-50"
            > {loadingStatus === "interested"
              ? <span className="loading loading-spinner loading-xs" />
              : <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            }Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
