import React, { useState, useEffect, useCallback } from "react";
import useAuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UpvoteDownvote } from "../components/UpvoteDownvote";
import axios from "../api/axios";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { addFeedback } from "../store/feedbackSlice";
import { useDispatch } from "react-redux";

export const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();
  const entry = useSelector((state) => state.feedback.entry);

  const dispatch = useDispatch();
  const handleAddFeedback = (event) => {
    event.preventDefault();
    dispatch(addFeedback({ title, details }));
    setTitle("");
    setDetails("");
  };
  console.log(entry);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const { user } = useAuthContext();

  const getFeedbacks = useCallback(() => {
    axios
      .get("/feedback")
      .then(({ data }) => {
        setFeedbacks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);


  return (
    <main>
      <div className="flex flex-row pl-72">
        <div>
          <p className="">Feature Requests</p>
        </div>
        <button
          className="w-auto focus:outline-none"
          onClick={handleButtonClick}
        >
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 overflow-y-auto z-8">
          <div className="">
            <div
              className=""
              style={{ maxWidth: "380px" }}
            >
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
                          className=""
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
                          className=""
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
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className=""
                  onClick={(event) => {
                    setShowPopup(false);
                    handleSubmit(event);
                    handleAddFeedback(event);
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
                  <div className="mb-2 text-xl font-bold">{feedback.title}</div>
                  <p className="text-base text-gray-700">{feedback.details}</p>
                </React.Fragment>
              </div>
            </div>
          </div>
          <div className="pt-3"></div>
        </div>
      ))}
      {entry.length !== 0 && (
        <div>
          <div className="max-w-6xl pl-4">
            <div className="px-6 py-4">
              {entry.map((item, id) => (
                <React.Fragment key={id}>
                  <div className="flex pt-2 pb-2 ml-[15.8rem] hover:bg-gray-50">
                    <div className="w-20 h-10 pt-8 pl-8">
                      {
                        <UpvoteDownvote
                          userId={user.id}
                          feedbackId={item.id}
                          initialVotes={
                            totalVotes[item.id] !== undefined
                              ? totalVotes[item.id]
                              : 0
                          }
                        />
                      }
                    </div>
                    <div className="max-w-6xl pl-4">
                      <div className="px-6 py-4">
                        <React.Fragment key={item.id}>
                          <div className="mb-2 text-xl font-bold">
                            {item[0]}
                          </div>
                          <p className="text-base text-gray-700">{item[1]}</p>
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="pt-3"></div>
        </div>
      )}
    </main>
  );
};
