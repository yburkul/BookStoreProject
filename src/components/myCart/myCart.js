import React, { useState } from "react";
import "./myCart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/redux";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";

function MyCart() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const getTotalPrice = () => {
    const total = cart.reduce(
      (total, item) => total + (item?.saleInfo?.retailPrice?.amount || 0),
      0
    );
    return total.toFixed(1);
  };
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const handleBuyNow = () => {
    navigate("/shoppingPage");
  };
  const continueShopping = () => {
    navigate("/books");
  };
  return (
    <div>
      <Header />
      <>
        {cart.length === 0 ? (
          <div className="noCard">
            <h1>Your Card is Empty</h1>
            <h5>There are no items in your cart</h5>
            <div className="shoppingButton">
              <button
                type="button"
                class="btn btn-primary"
                onClick={continueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-details">
              {cart?.map((book) => {
                return (
                  <div className="cart-box">
                    <div className="cart-info">
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        style={{ width: "100px", height: "130px" }}
                      />
                      <div className="cart-info-box">
                        <h6 className="card-title">
                          {book?.volumeInfo?.title}
                        </h6>
                        <span>Author:- {book?.volumeInfo?.authors[0]}</span>

                        <p className="card-text text-success font-weight-bold">
                          Price:- {book?.saleInfo?.listPrice?.amount || 0} ₹
                        </p>
                      </div>

                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => handleRemoveFromCart(book)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="total-price-cart">
              <div className="total-price">
                <p>
                  Total Price ({cart.length}) :- {getTotalPrice()} ₹
                </p>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleBuyNow}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </>
      <div
        className={`toast ${
          showToast ? "show" : ""
        } text-bg-danger align-items-center position-fixed top-0 end-0 p-3`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ marginTop: "80px" }}
      >
        <div class="d-flex">
          <div class="toast-body">Item removed from the cart!</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
