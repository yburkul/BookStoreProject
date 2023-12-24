import React, { useEffect, useState } from "react";
import "./Books.css";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
const baseUrl = "https://www.googleapis.com/books/v1";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("programming");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const currentBooks = books.filter(
    (book) =>
      book.volumeInfo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.volumeInfo.authors[0]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/volumes?q=${filter}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items);
      })
      .catch((error) => console.error("Error fetching books:", error))
      .finally(() => setLoading(false));
  }, [filter]);

  function formatText(text) {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const goToBookDetails = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="filter-container">
        <h5>{filter.charAt(0).toUpperCase() + filter.slice(1)} Books</h5>
        <div>
          <label htmlFor="filter">Filter by: </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="programming">Programming</option>
            <option value="fiction">Fiction</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : currentBooks.length === 0 ? (
        <div className="blockquote text-center mt-5 text-danger">
          <p>
            No books found matching your search. Please try different keywords
            or filters.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-start book-box">
          {currentBooks?.map((book, index) => (
            <div
              key={index}
              className="shadow bg-white rounded m-5"
              style={{ maxWidth: "16rem", height: "28rem", width: "270px" }}
              onClick={() => goToBookDetails(book.id)}
            >
              <div
                className="card rounded"
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  style={{ width: "100%", height: "50%" }}
                />
                <div className="card-body d-flex flex-column justify-content-evenly">
                  <h5 className="card-title">{book?.volumeInfo?.title}</h5>
                  <p className="card-text">
                    Author:- {book?.volumeInfo?.authors?.[0] || ""}
                  </p>
                  <p className="card-text text-success font-weight-bold">
                    Price:- {book?.saleInfo?.listPrice?.amount || 0} ₹
                  </p>
                  <span
                    class={`badge p-2 ${
                      book?.saleInfo.isEbook
                        ? "text-bg-success"
                        : "text-bg-danger"
                    }`}
                  >
                    {formatText(book.saleInfo.saleability)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Books;
