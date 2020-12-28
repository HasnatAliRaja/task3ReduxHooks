import React, { Component, useEffect, useState } from "react";
import "./Detail.css";

const Detail = (props) => {
  
  
  //Dumb Works! useMemo useCallback useRef!!!
  console.log("Janab",props);
  const book = props.location.state.Book;
  console.log("Mahatama Books",book) 
  return (
    <div className="detailsContainer">
      {book !== undefined && book.volumeInfo !== undefined ? (
        <div className="contentMain">
          <img
            className="bookImage"
            src={
              book.volumeInfo !== undefined &&
              book.volumeInfo.imageLinks !== undefined
                ? book.volumeInfo.imageLinks.smallThumbnail
                : "The Image could not be loaded"
            }
          ></img>
          <div>
            {book.volumeInfo !== undefined ? (
              <h2 className="bookName">{book.volumeInfo.title}</h2>
            ) : (
              ""
            )}
            {book.volumeInfo.authors !== undefined && (
              <p className="authors">
                {book.volumeInfo.authors.map((author) => (
                  <p>{author}</p>
                ))}
              </p>
            )}
            <hr className="divider"></hr>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  book.volumeInfo !== undefined
                    ? book.volumeInfo.description
                    : "",
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Detail;
