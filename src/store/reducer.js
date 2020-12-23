import constants from "./constants";

const initialState = {
  books: [],
  selectedBook: {},
  searchedResults: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_QUERY:
      return {
        ...state,
        books: action.payload.books,
      };
    case constants.FETCH_BOOK:
      return {
        ...state,
        selectedBook: action.payload.book,
      };
    case constants.FETCH_BOOKS:
    console.log(action.payload);  
    return {
        ...state,
        books: [...state.books, ...action.payload.books],
      };
    case constants.SEARCH_BOOKS:
      return {
        ...state,
        searchedResults: action.payload.results,
      };

    default:
      return state;
  }
};

export default reducer;
