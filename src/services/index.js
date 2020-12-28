const URI = `https://www.googleapis.com/books/v1/volumes`;
// const fetchBook = async (id) => {
//   try {
//     const data = await fetch(URI + `/` + id);
//     return await data.json();
//   } catch (error) {
//     return error;
//   }
// };

const fetchBooks = async (query, startIndex = 0) => {
  try {
    console.log("fetchBooks");
    const data = await fetch(
      URI + `?q=${query}&projection=lite&maxResults=10&startIndex=${startIndex}`
    );
    return await data.json();
  } catch (error) {
    return error;
  }
};

const searchBooks = async (query) => {
  try {
    console.log("searchBooks", query + "q");
    const data = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
    );
    console.log("data", await data.json());
    return await data.json();
  } catch (error) {
    return error;
  }
};
export default { fetchBooks, /*fetchBook,*/ searchBooks };
