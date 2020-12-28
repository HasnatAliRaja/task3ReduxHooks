import constants from "./constants";

const initialState = {
  books: [],
  selectedBook: {},
  searchedResults: [],
  isLoadingBar: false,
  isLoadingMoreButton: false,
  isSearchPageLoading: true,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_QUERY:
      // console.log("oindi1",action.payload.results)
      return {
        ...state,
        books: action.payload.books,
      };
    case constants.FETCH_BOOK:
      // console.log("oindi2",action.payload.results)
      return {
        ...state,
        selectedBook: action.payload.book,
      };
    case constants.FETCH_BOOKS:
      // console.log("oindi3",action.payload);
      return {
        ...state,
        books: [...state.books, ...action.payload.books],
      };
    case constants.SEARCH_BOOKS:
      // console.log("oindi4",action.payload.results)
      return {
        ...state,
        searchedResults: action.payload.results,
      };
    case constants.LOADIN_BAR:
      return {
        ...state,
        isLoadingBar: action.payload.show,
      };
    case constants.LOADMORE_BUTTON:
      return {
        ...state,
        isLoadingMoreButton: action.payload.show,
      };
    case constants.SEARCH_PAGE_LOADER:
      return {
        ...state,
        isSearchPageLoading:action.payload.show
      }
    default:
      return state;
  }
};

export default reducer;
