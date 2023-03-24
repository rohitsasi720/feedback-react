import React, { useState } from "react";
import { Link } from "react-router-dom";
import bulb from "../assets/idea.png";
import { FeedbackBox } from "../components/FeedbackBox";
import { UpvoteDownvote } from "../components/UpvoteDownvote";
import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";
import axios from "../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Feedback = () => {
  const { user, getUser, logout } = useAuthContext();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [getUser, user]);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = () => {
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
  };

  useEffect(() => {
    const storedTotalVotes = JSON.parse(localStorage.getItem("totalVotes"));
    if (storedTotalVotes) {
      setTotalVotes(storedTotalVotes);
    } else {
      const initialTotalVotes = {};
      feedbacks.forEach((feedback) => {
        axios
          .get(`/api/feedback/${feedback.id}/total_votes`)
          .then((response) => {
            initialTotalVotes[feedback.id] = response.data.total_votes;
            setTotalVotes(initialTotalVotes);
            localStorage.setItem(
              "totalVotes",
              JSON.stringify(initialTotalVotes)
            );
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }, [feedbacks]);

  return (
    <main>
      <section>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
          <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
            <div className="relative flex justify-between w-full text-2xl font-semibold text-gray-400 lg:w-auto lg:static lg:block lg:justify-start">
              Mozilor
            </div>
            <div className="flex-shrink-0">
              {user ? (
                <button
                  className="px-4 py-2 text-gray-400 border rounded border-slate-200"
                  onClick={logout}
                >
                  LOGOUT
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-400 border rounded border-slate-200"
                  >
                    LOG IN / SIGN UP
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </section>

      <section>
        <div className="container items-center px-4 pt-6 mx-auto">
          <div>
            <div className="flex items-center">
              <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
                <img
                  src={bulb}
                  alt="idea"
                  style={{ height: "20px", width: "20px", marginRight: "8px" }}
                />
              </div>
              <div className="relative flex flex-col justify-center w-full pt-4 text-xl font-semibold text-gray-900 lg:w-auto lg:static lg:block lg:justify-start">
                <span className="text-xl">Give feedback</span>
                <hr className="my-2 border-2 border-black hr"></hr>
              </div>
            </div>
            <div className="flex pt-8">
              <FeedbackBox />

              <div className="flex flex-col ml-[-1.75rem]">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id}>
                    <div className="flex pt-2 pb-2">
                      <div className="w-20 h-10 pt-4 pl-8 ">
                        {!loading ? (
                          <UpvoteDownvote
                            userId={user.id}
                            feedbackId={feedback.id}
                            initialVotes={
                              totalVotes[feedback.id] !== undefined
                                ? totalVotes[feedback.id]
                                : 0
                            }
                          />
                        ) : (
                          <Skeleton />
                        )}
                      </div>

                      <div className="max-w-6xl pl-4">
                        <div className="px-6">
                          <React.Fragment>
                            <div className="mb-2 text-xl font-bold">
                              {!loading ? feedback.title : <Skeleton />}
                            </div>
                            <p className="text-base text-gray-700">
                              {!loading ? feedback.details : <Skeleton />}
                            </p>
                          </React.Fragment>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
