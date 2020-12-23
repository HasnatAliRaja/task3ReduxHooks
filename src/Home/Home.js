import React, { useEffect, useState } from "react";
import actions from "../store/actions";
import "./Home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const books = useSelector((state) => state.books);
  console.log(books);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(10);

  useEffect(() => {
    dispatch(actions.fetchBooks(input));
  }, [input]);

  let handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setOpen(false);
      setInput("");
    }
  };

  let onLoadClick = () => {
    dispatch(actions.paginate(input, startIndex));
    setStartIndex(startIndex + 10);
  };

  let setSearchBar = (e) => {};

  return (
    <div>
      <div className="searchBoxContainer">
        <div className="searchBoxDiv">
          <input
            className="searchField"
            value={input}
            placeholder="Enter Book Name...."
            onInput={() => setOpen(true)}
            // onBlur={() => setOpen(false)}
            onChange={handleChange}
          ></input>
          <Link
            to={`/search/${input.replace(/\s/g, "+")}`}
            className="searchLink"
          >
            <button
              key={input}
              disabled={input.length >= 3 ? false : true}
              className="searchButton"
            >
              Search
            </button>
          </Link>
        </div>

        {open && books !== undefined && (
          <div className="suggestionsBoxContainer">
            <div className="suggestionsBox">
              {books === undefined && books.length === 0 && (
                <div className="suggestion">Not Found</div>
              )}
              {books !== undefined &&
                books.map((book) => (
                  <div
                    className="suggestion"
                    key={book.id}
                    onClick={setSearchBar}
                    value={
                      book.volumeInfo !== undefined &&
                      book.volumeInfo.title !== undefined
                        ? book.volumeInfo.title
                        : "failed"
                    }
                  >
                    {book.volumeInfo !== undefined &&
                    book.volumeInfo.title !== undefined ? (
                      <Link
                        className="routerLinks"
                        to={{
                          pathname: `/details/${book.id}`,
                          state: { Book: book },
                        }}
                      >
                        {book.volumeInfo.title}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              {startIndex <= 40 && books!=''&& (
                <button className="loadMoreButton" onClick={onLoadClick}>
                  Load More
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
