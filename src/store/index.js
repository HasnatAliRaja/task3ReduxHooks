import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import Thunk from "redux-thunk";

const initialState = {
  books: [],
  selectedBook: {},
  searchedResults: [],
  isLoadingBar: false,
  isLoadingMoreButton: false,
  isSearchPageLoading: true
};

const store = createStore(reducer, initialState, applyMiddleware(Thunk));
export default store;
