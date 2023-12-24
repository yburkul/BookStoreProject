import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../login/login";
import Books from "../books/books";
import BookDetails from "../bookDetails/bookDetails";
import MyCart from "../myCart/myCart";
import ShoppingPage from "../shoppingPage/shoppingPage";
import OrderHistory from "../orderHistory/orderHistory";
import OrderDetails from "../orderDetails/orderDetails";
import Profile from "../profile/profile";

function Router1() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/books/:id" element={<BookDetails />} />
          <Route exact path="/cart" element={<MyCart />} />
          <Route exact path="/shoppingPage" element={<ShoppingPage />} />
          <Route exact path="/order/:orderId" element={<OrderDetails />} />
          <Route exact path="/orderHistory" element={<OrderHistory />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}
export default Router1;
