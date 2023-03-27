import React, { useState, useEffect, useCallback } from "react";
import useAuthContext from "../context/AuthContext";
import Logo from "../assets/mozilor-logo.svg";
import Avatar from "../assets/avatar.avif";
import Feedback from "../assets/feedback.png";
import { Link, useNavigate } from "react-router-dom";
import { UpvoteDownvote } from "../components/UpvoteDownvote";
import axios from "../api/axios";
//import { FeedbackList } from "../components/FeedbackList";

export const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const csrf = useCallback(() => axios.get("/sanctum/csrf-cookie"), []);
  const [totalVotes, setTotalVotes] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();
    try {
      const response = await axios.post("/submit-form", {
        name,
        email,
        title,
        details,
      });
      setName("");
      setEmail("");
      setTitle("");
      setDetails("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const { user, getUser, logout } = useAuthContext();

 useEffect(() => {
   async function fetchUser() {
     const user = await getUser();
     if (!user) {
       navigate("/login");
     }
   }
   fetchUser();
 },[]);


  const getFeedbacks = useCallback(() => {
    setLoading(true);
    axios
      .get("/feedback")
      .then(({ data }) => {
        setLoading(false);
        setFeedbacks(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("useremail");
    const storedName = localStorage.getItem("username");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedName) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    const storedTotalVotes = JSON.parse(localStorage.getItem("totalVotes"));

    async function fetchTotalVotes() {
      const initialTotalVotes = {};

      for (const feedback of feedbacks) {
        if (feedback && feedback.id) {
          try {
            const response = await axios.get(
              `/api/feedback/${feedback.id}/total_votes`
            );
            initialTotalVotes[feedback.id] = response.data.total_votes;
            localStorage.setItem(
              "totalVotes",
              JSON.stringify(initialTotalVotes)
            );
          } catch (error) {
            console.error(error);
          }
        }
      }

      setTotalVotes(initialTotalVotes);
    }

    if (storedTotalVotes) {
      setTotalVotes(storedTotalVotes);
    } else {
      fetchTotalVotes();
    }
  }, [feedbacks]);

  return (
    <main>
      <div>
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[255px] overflow-y-auto text-center">
          <div className="p-2.5 mt-0.5 flex items-center">
            <img
              src={Logo}
              style={{ height: "30px", width: "115px" }}
              className="h-6 mr-3 sm:h-9"
              alt="Mozilor Logo"
            />
          </div>
          <div className="flex items-center p-2 pt-6 mb-5 space-x-4">
            <img className="h-12 rounded-full" src={Avatar} alt="avatar" />
            <div>
              <h4
                className="text-lg font-semibold tracking-wide text-gray-700 capitalize font-poppins"
                id="name"
              >
                {JSON.parse(localStorage.getItem("user")).name}
              </h4>
              <span className="flex items-center space-x-1 text-sm tracking-wide">
                <svg
                  className="h-4 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-gray-600">Admin</span>
              </span>
            </div>
          </div>
          <Link
            to="/feedback"
            className="p-2.5 m-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-slate-100 hover:bg-gray-200 text-black"
          >
            <img
              src={Feedback}
              alt="feedback_icon"
              style={{ height: "20px", width: "20px" }}
            />
            <span className="text-[15px] ml-4 text-gray-700 font-semibold">
              Feedback
            </span>
          </Link>
          <div className="absolute top-0 right-0 h-full border-l-2 border-gray-100"></div>
        </div>
      </div>
      <div className="flex flex-row pl-72">
        <div>
          <p className="pt-6 pr-4 text-2xl font-bold pb-14">Feature Requests</p>
        </div>
        <button
          className="w-auto focus:outline-none"
          onClick={handleButtonClick}
        >
          <div className="flex pb-8">
            <div className="flex items-center justify-center flex-1 p-2 text-white bg-blue-700 rounded-full shadow">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </button>
        {user ? (
          <button
            className="h-12 p-2 px-4 py-2 mt-6 ml-auto mr-2 text-gray-400 border rounded pt- border-slate-200"
            onClick={logout}
          >
            LOGOUT
          </button>
        ) : (
          <></>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 overflow-y-auto z-8">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              style={{ maxWidth: "380px" }}
            >
              <button
                type="button"
                className="box-content pt-2 border-none rounded-none pl-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
                onClick={() => setShowPopup(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <div className="mt-3 sm:mt-5">
                  <h3 className="text-lg font-bold leading-6 text-gray-900">
                    Create new post
                  </h3>
                  <form className="pt-6 space-y-6">
                    <div>
                      <label
                        className="block font-medium text-gray-700"
                        htmlFor="name"
                      >
                        TITLE
                      </label>
                      <div className="mt-1">
                        <input
                          className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          type="text"
                          id="name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          name="name"
                          placeholder="Short, descriptive title"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block font-medium text-gray-700"
                        htmlFor="name"
                      >
                        DETAILS
                      </label>
                      <div className="mt-1">
                        <textarea
                          className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-24 resize-none"
                          id="detail"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          name="detail"
                          placeholder="Any additional details..."
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="items-center px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-3xl"
                  onClick={(event) => {
                    setShowPopup(false);
                    handleSubmit(event);
                  }}
                >
                  → Submit feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {feedbacks.map((feedback) => (
        <div key={feedback.id}>
          <div className="flex pt-2 pb-2 ml-[15.8rem] hover:bg-gray-50">
            <div className="w-20 h-10 pt-8 pl-8">
              {
                <UpvoteDownvote
                  userId={user.id}
                  feedbackId={feedback.id}
                  initialVotes={
                    totalVotes[feedback.id] !== undefined
                      ? totalVotes[feedback.id]
                      : 0
                  }
                />
              }
            </div>

            <div className="max-w-6xl pl-4">
              <div className="px-6 py-4">
                <React.Fragment key={feedback.id}>
                  <div className="mb-2 text-xl font-bold">
                    {feedback.title}
                  </div>
                  <p className="text-base text-gray-700">
                    {feedback.details}
                  </p>
                </React.Fragment>
              </div>
            </div>
          </div>
          <div className="pt-3"></div>
        </div>
      ))}
    </main>
  );
};
