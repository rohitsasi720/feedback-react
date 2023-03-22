import axios from "../../api/axios";

export const getFeedback = () => async dispatch => {
  try {
    const response = await axios.get("/feedback");
        dispatch({
          type: "GET_FEEDBACK_SUCCESS",
          payload: response.data,
        });
    }
    catch(error) {
        console.log(error);
      };
};
