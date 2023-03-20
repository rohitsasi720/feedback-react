import { useState } from "react";

export const UpvoteDownvote = () => {
  const [votes, setVotes] = useState(0);
  const [voteState, setVoteState] = useState(null);

  const handleVote = () => {
    if (voteState === null) {
      setVotes((prevVotes) => prevVotes + 1);
      setVoteState("upvote");
    } else if (voteState === "upvote") {
      setVotes((prevVotes) => prevVotes - 1);
      setVoteState("downvote");
    } else {
      setVotes((prevVotes) => prevVotes + 1);
      setVoteState("upvote");
    }
  };

  return (
    <button
      className="w-16 py-2 mr-4 font-semibold text-gray-800 bg-white border border-gray-200 rounded shadow first-letter:px-4 hover:bg-gray-100"
      onClick={handleVote}
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
