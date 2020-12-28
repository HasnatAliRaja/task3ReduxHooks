import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import "./searchPage.css";
import { Link } from "react-router-dom";
import actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import loadingGif from "../assets/gifs/tenor.gif";

const Search = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.searchPageLoader(true));
    dispatch(actions.searchBooks(match.params.words));
    setTimeout(()=>{
      dispatch(actions.searchPageLoader(false));
    },500)
  },[]);
  const books = useSelector((state) => state.books);
  const isSearchPageLoading = useSelector((state)=> state.isSearchPageLoading);
  

  console.log("lalal", books);

  return (
    <div className="searchPageWrapper">
      <div className="containerGrid">
        {books !== undefined
          ? books.map((bookCard) => (
              <Link
                to={{
                  pathname: `/details/${bookCard.id}`,
                  state: { Book: bookCard },
                }}
              >
                <Card
                  key={bookCard.id}
                  image={
                    bookCard.volumeInfo.imageLinks !== undefined
                      ? bookCard.volumeInfo.imageLinks.smallThumbnail
                      : ""
                  }
                  title={bookCard.volumeInfo.title}
                  authors={bookCard.volumeInfo.authors}
                />
              </Link>
            ))
          : "No match found"}
      </div>
      {isSearchPageLoading&&<div className="loaderHolderGif">
        <img className="searchLoader" src={loadingGif} />
      </div>}
    </div>
  );
};

const Card = (props) => {
  return (
    <div className="bookCard">
      <img src={props.image} />
      <span className="title">{props.title}</span>
      <div className="toolTip">
        <span className="toolText">{props.title}</span>
      </div>
      <h6>{props.authors ? props.authors[0] : ""}</h6>
    </div>
  );
};

export default Search;
