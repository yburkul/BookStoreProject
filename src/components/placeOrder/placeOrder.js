import React, { useContext, useState } from "react";
import { myBasket } from "../shoppingPage/shoppingPage";
import "./placeOrder.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, resetCart } from "../redux/redux";

function PlaceOrder() {
  const { setTab } = useContext(myBasket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUser = userInfo.find((user) => user.isLoggedIn);
  let user_Id;

  if (loggedInUser) {
    user_Id = loggedInUser.userId;
  } else {
    console.log("No user is logged in");
  }
  const userAddress = JSON.parse(localStorage.getItem(`${user_Id}_Address`));
  const userPayemntMethod = JSON.parse(
    localStorage.getItem("selectedPaymentMethod")
  );

  const { name, address, city, state, zip, country } = userAddress;
  const cart = useSelector((state) => state.cart.cartItems);
  function handleAddressEdit() {
    setTab("Shopping Address");
  }
  function handlePaymentMethodEdit() {
    setTab("Payment Method");
  }
  function handleItemEdit() {
    navigate("/cart");
  }
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const getTotalPrice = () => {
    const shippingCost = 40;

    const subtotal = cart.reduce(
      (subtotal, item) => subtotal + (item?.saleInfo?.retailPrice?.amount || 0),
      0
    );

    const total = subtotal + shippingCost;

    return {
      subtotal: subtotal.toFixed(1),
      shippingCost: shippingCost.toFixed(1),
      total: total.toFixed(1),
    };
  };
  const { subtotal, shippingCost, total } = getTotalPrice();

  function generateOrderId(userId) {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 5);
    return `${userId}-${timestamp}-${randomString}`;
  }

 

  const handlePlaceOrder = () => {
    if (loggedInUser) {
      const userId = loggedInUser.userId;
      const orderId = generateOrderId(userId);
      const orderDate = new Date().toLocaleString();

      const orderDetails = {
        orderId,
        userAddress,
        userPayemntMethod,
        items: cart,
        totalOrderCost: getTotalPrice(),
        orderDate,
      };
      let existingOrders =
        JSON.parse(localStorage.getItem(`${user_Id}_orderDetails`)) || [];
      if (!Array.isArray(existingOrders)) {
        existingOrders = [];
      }

      existingOrders.push(orderDetails);

      localStorage.setItem(
        `${user_Id}_orderDetails`,
        JSON.stringify(existingOrders)
      );
      dispatch(resetCart());

      localStorage.setItem("selectedOrderItem", JSON.stringify(orderDetails));
      navigate(`/order/${orderId}`);
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <>
      <div className="order-container">
        <div className="d-flex flex-column align-items-start justify-content-start order-box">
          <h4 class="mb-4">Place Order</h4>
          <div class="continer d-flex flex-column align-items-start justify-content-evenly mt-1 shadow p-3 bg-white rounded shopping-address-box">
            <h5 class="m-2">Shopping Address</h5>
            <p class="m-2">
              {name}, {address}, {city}, {state}, {zip}, {country}
            </p>
            <button
              type="button"
              class="btn btn-light m-2"
              onClick={handleAddressEdit}
            >
              Edit
            </button>
          </div>
          <div
            class="continer d-flex flex-column align-items-start justify-content-evenly mt-4 shadow p-3 bg-white rounded"
            style={{ width: "90%" }}
          >
            <h5 class="m-2">Payment Method</h5>
            <p class="m-2">{userPayemntMethod}</p>
            <button
              type="button"
              class="btn btn-light m-2"
              onClick={handlePaymentMethodEdit}
            >
              Edit
            </button>
          </div>
          <div class="d-flex flex-column align-items-start justify-content-evenly mt-4 mb-2 shadow p-3 bg-white rounded table-box">
            <h5 class="m-2">Order Items</h5>
            <table class="table table-bordered m-2">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quntity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr>
                      <td class="d-flex align-item-center">
                        <img
                          src={item.volumeInfo.imageLinks.thumbnail}
                          alt={item.volumeInfo.title}
                          class="m-1"
                          style={{ width: "25px", height: "25px" }}
                        />
                        <span>{item?.volumeInfo?.title}</span>
                      </td>
                      <td>1</td>
                      <td>{item?.saleInfo?.listPrice?.amount}₹</td>
                      <td>
                        <button
                          type="button"
                          class="btn-close"
                          aria-label="Close"
                          onClick={() => handleRemoveFromCart(item)}
                        ></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              type="button"
              class="btn btn-light m-2"
              onClick={handleItemEdit}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="total-order-price-box">
          <div className="total-order-price">
            <h5>Order Summary</h5>
            <div class="item-box d-flex flex-row justify-content-between m-1">
              <span>Items</span>
              <span>{subtotal}₹</span>
            </div>
            <div class="item-box d-flex flex-row justify-content-between m-1">
              <span>Delivery Charges</span>
              <span>{shippingCost}₹</span>
            </div>
            <hr
              style={{ border: "1px solid grey", width: "90%", margin: "0" }}
            />
            <div class="d-flex flex-row justify-content-between m-1 item-box">
              <span>Total</span>
              <span>{total}₹</span>
            </div>

            <button
              type="button"
              class="btn btn-primary"
              onClick={handlePlaceOrder}
              disabled={!cart.length}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PlaceOrder;
