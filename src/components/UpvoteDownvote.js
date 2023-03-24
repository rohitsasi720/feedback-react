import { useState } from "react";
import axios from "../api/axios";


export const UpvoteDownvote = ({ feedbackId, userId, initialVotes }) => {
  
  {
    console.log("hi" + initialVotes);
  }
  const [votes, setVotes] = useState(initialVotes);
  const [voteState, setVoteState] = useState(null);

  const handleVote = (voteType) => {
    axios
      .post(`/api/vote`, {
        user_id: userId,
        feedback_id: feedbackId,
        vote_type: voteType,
      })
      .then((response) => {
        setVotes(response.data.total_votes);
        console.log(response.data.total_votes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const handleButtonClick = (event) => {
      const button = event.target;
      const buttonHeight = button.offsetHeight;
      const clickY = event.clientY - button.getBoundingClientRect().top;
      console.log(clickY);

      if (clickY < buttonHeight / 2) {
        handleVote(1);
        setVoteState("upvote")
        console.log(voteState) 
      } else {
        handleVote(-1);
        setVoteState("downvote")
        console.log(voteState) 
      }
    };
      
  return (
    <button
      className="relative w-16 py-2 mr-4 font-semibold text-gray-800 bg-white border border-gray-200 rounded shadow first-letter:px-4 hover:bg-gray-100"
      onClick={handleButtonClick}
    >
      {voteState === "downvote" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-6 h-6 mr-1 text-red-500 align-middle"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span className="inline-block align-middle">{votes}</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-6 h-6 mr-1 text-gray-400 align-middle"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span className="inline-block align-middle">{votes}</span>
        </>
      )}
    </button>
  );
};
