import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import Thunk from "redux-thunk";

const initialState = {
  books: [],
  selectedBook: {},
  searchedResults: [],
};

const store = createStore(reducer, initialState, applyMiddleware(Thunk));
export default store;
