import { createStore } from "redux";
import rootReducer from "./reducers/feedbackReducer";

const store = createStore(rootReducer);

export default store;
