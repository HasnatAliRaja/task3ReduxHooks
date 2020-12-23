import constants from "./constants";
import services from "../services";

const fetchBooks = (query) => {
  return async (dispatch) => {
    try {
      const response = await services.fetchBooks(query);
      dispatch({
        type: constants.FETCH_QUERY,
        payload: { books: response.items },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const paginate = (query, startIndex) => {
  return async (dispatch) => {
    try {
      const response = await services.fetchBooks(query, startIndex);
      dispatch({
        type: constants.FETCH_BOOKS,
        payload: { books: response.items },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// const fetchBook = (bookId) => {
//   return async (dispatch) => {
//     try {
//       const book = await services.fetchBook(bookId);
//       dispatch({ type: constants.FETCH_BOOK, payload: { book } });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

const searchBooks = (query) => {
  return async (dispatch) => {
    try {
      const results = await services.searchBooks(query);
      dispatch({
        type: constants.SEARCH_BOOKS,
        payload: { results: results.items },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export default { fetchBooks, /*fetchBook,*/ searchBooks, paginate };
