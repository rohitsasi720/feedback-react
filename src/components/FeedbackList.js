import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getFeedback } from "../store/actions/feedbackActions";


export const FeedbackList = ({ feedback, getFeedback }) => {
  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  return (
    <div className="mb-2 text-xl font-bold">
      {feedback && feedback.map((feed, index) => (
          <div key={index}>
            {feed && feed.title && <h2>{feed.title}</h2>}
            {feed && feed.details && (
              <p className="text-base text-gray-700">{feed.details}</p>
            )}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    feedback: state.feed.feedback,
  };
};

export default connect(mapStateToProps, { getFeedback })(FeedbackList);
