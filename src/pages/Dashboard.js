import React from "react";
import Logo from "../assets/mozilor-logo.svg";
import Avatar from "../assets/avatar.avif";
import Feedback from "../assets/feedback.png";
import { Link } from "react-router-dom";
import { UpvoteDownvote } from "../components/UpvoteDownvote";

export const Dashboard = () => {
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
                {localStorage.username}
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
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-slate-100 hover:bg-gray-200 text-black"
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
      <div className="pl-72">
        <p className="pt-4 pb-16 text-2xl font-bold">Feature Requests</p>
      </div>

      <div className="flex pt-2 pb-2 ml-[15.8rem] bg-gray-50">
        <div className="w-20 h-10 pt-8 pl-8">
          <UpvoteDownvote />
        </div>
        <div className="h-24 max-w-6xl pl-4">
          <div className="px-6">
            <div className="mb-2 text-xl font-bold">
              Lorem ipsum dolor sit amet
            </div>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, Nonea! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </div>
      <div className="pt-3"></div>
      <div className="flex pt-2 pb-2 ml-[15.8rem] bg-gray-50">
        <div className="w-20 h-10 pt-8 pl-8">
          <UpvoteDownvote />
        </div>
        <div className="h-24 max-w-6xl pl-4">
          <div className="px-6">
            <div className="mb-2 text-xl font-bold">
              Lorem ipsum dolor sit amet
            </div>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, Nonea! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
