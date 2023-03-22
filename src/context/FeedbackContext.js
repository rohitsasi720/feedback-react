import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const FeedbackContext = createContext();

const FeedbackContextProvider = ({ children }) => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/feedback");
      setFeedbackData(result.data);
    };
    fetchData();
  }, []);

  return (
    <FeedbackContext.Provider value={{ feedbackData }}>
      {children}
    </FeedbackContext.Provider>
  );
};


export { FeedbackContext, FeedbackContextProvider };
