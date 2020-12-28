import React, { useEffect, useState } from "react";
import actions from "../store/actions";
import "./Home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loadingGif from "../assets/gifs/tenor.gif";

const Home = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(10);
  const isLoadingBar = useSelector((state) => state.isLoadingBar);
  const isLoadingMoreButton = useSelector ((state)=>state.isLoadingMoreButton);

  useEffect(() => {
    dispatch(actions.searchBarLoader(true));
    console.log(isLoadingBar);
    dispatch(actions.fetchBooks(input));

    console.log(isLoadingBar);
  }, [input]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(actions.searchBarLoader(false));
    }, 250);
    setTimeout(()=>{
      dispatch(actions.loadMoreLoader(false));
    },500)
  });

  let handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setOpen(false);
      setInput("");
    }
  };

  let onLoadClick = () => {
    dispatch(actions.loadMoreLoader(true));
    setTimeout(()=>{
      dispatch(actions.paginate(input, startIndex));
    },250);
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
          <div className="loaderContainerBar">
            {isLoadingBar && (
              <img className="searchFieldLoader" src={loadingGif} />
            )}
          </div>
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
              {startIndex <= 40 && books != "" && (
                <button className="loadMoreButton" onClick={onLoadClick}>
                  Load More{" "}
                  {isLoadingMoreButton&&<img className="loadMoreLoader" src={loadingGif} />}
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
