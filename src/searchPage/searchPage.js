import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import "./searchPage.css";
import { Link } from "react-router-dom";
import actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Search = ({ match }) => {
  const dispatch=useDispatch();
  useEffect(() => {

    dispatch(actions.searchBooks(match.params.words));
    
  }, []);
  const books=useSelector(state=>state.books);
  
  
  



  return (
   <div className="containerGrid">
      {books!==undefined?books.map((bookCard) => (
        <Link to={`/details/${bookCard.id}`}>
          <Card
            key={bookCard.id}
            image={bookCard.volumeInfo.imageLinks.smallThumbnail}
            title={bookCard.volumeInfo.title}
            authors={bookCard.volumeInfo.authors}
          />
        </Link>
      )):"No match found"}
    </div>
  );
};

const Card = (props) => {
  return (
    <div className="bookCard">
      <img src={props.image} />
      <span>{props.title}</span>
      <div className="toolTip">
        <span className="toolText">{props.title}</span>
      </div>
      <h6>{props.authors ? props.authors[0] : ""}</h6>
    </div>
  );
};

export default Search;
