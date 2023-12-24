import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./bookDetails.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/redux";
import Header from "../header/header";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const baseUrl = "https://www.googleapis.com/books/v1";
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const bookId = id;
    fetch(`${baseUrl}/volumes/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  function formatText(text) {
    // Replace underscores with spaces and capitalize each word
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }
  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <Header />
      <div class="book-container">
        <div className="book-img">
          <img
            src={book?.volumeInfo?.imageLinks?.thumbnail}
            alt={book?.volumeInfo?.title}
            width="250"
            height="300"
          />
        </div>
        <div className="book-info" >
          <h3>Name:- {book?.volumeInfo?.title}</h3>
          <p>
            Subtitle:- {book?.volumeInfo?.subtitle || "No subtitle available"}
          </p>
          <p>
            Authors:{" "}
            {book?.volumeInfo?.authors?.length > 1
              ? book?.volumeInfo?.authors?.slice(0, -1).join(", ") +
                " and " +
                book?.volumeInfo?.authors?.slice(-1)
              : book?.volumeInfo?.authors?.[0] || ""}
          </p>
          <p>
            Categories:-{" "}
            {book?.volumeInfo?.categories?.join(", ") ||
              "Computers / Programming / General"}
          </p>
          <p className="d-flex align-items-center text-success font-weight-bold">
            Price:- {book?.saleInfo?.retailPrice?.amount || 0} ₹{" "}
            {book?.saleInfo.isEbook === false && (
              <h6>
                <span className="badge p-2 text-bg-danger mt-3 m-2">
                  {formatText(book.saleInfo.saleability)}
                </span>
              </h6>
            )}
          </p>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              disabled={!book?.saleInfo?.retailPrice?.amount}
              onClick={() => handleAddToCart(book)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div
        className={`toast ${
          showToast ? "show" : ""
        } text-bg-success align-items-center position-fixed top-0 end-0 p-3`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ marginTop: "80px" }}
      >
        <div class="d-flex">
          <div class="toast-body">Item added to the cart!</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
