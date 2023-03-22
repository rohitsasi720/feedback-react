const initialState = {
  feedback: {},
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FEEDBACK_SUCCESS":
      return {
        feedback: action.payload,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
