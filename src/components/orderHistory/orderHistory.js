import React from "react";
import { useNavigate } from "react-router-dom";
import "./orderHistory.css";
import Header from "../header/header";

function OrderHistory() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUser = userInfo.find((user) => user.isLoggedIn);
  let user_Id;

  if (loggedInUser) {
    user_Id = loggedInUser.userId;
  } else {
    console.log("No user is logged in");
  }
  const order = JSON.parse(localStorage.getItem(`${user_Id}_orderDetails`));

  const continueShopping = () => {
    navigate("/books");
  };
  const handleDetailsClick = (item) => {
    localStorage.setItem("selectedOrderItem", JSON.stringify(item));
    navigate(`/order/${item.orderId}`);
  };
  return (
    <>
      <Header />
      <div class="box-table mt-4">
        <h5 class="d-flex m-3">Order History</h5>
        {order === null ? (
          <>
            {" "}
            <div className="noOrderHistory">
              <h3>No Order History is available</h3>
              <span>If u want shopping please click on below button</span>
              <div>
                <button
                  type="button"
                  class="btn btn-primary mt-4"
                  onClick={continueShopping}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        ) : (
          <table class="table m-3">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Paid</th>
                <th scope="col">Delivered</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {order?.map((item) => {
                const last12DigitsOrderId = item?.orderId.slice(-12);
                const dateString = item.orderDate;
                const dateObject = new Date(dateString);
                const formattedDate = dateObject.toLocaleDateString();
                return (
                  <tr>
                    <td>
                      <span>{last12DigitsOrderId}</span>
                    </td>
                    <td>
                      <span>{formattedDate}</span>
                    </td>
                    <td>
                      <span>{item.totalOrderCost.total}₹ </span>
                    </td>
                    <td>not paid</td>
                    <td>On the way</td>
                    <td>
                      <span
                        className="details-click"
                        onClick={() => handleDetailsClick(item)}
                      >
                        Details
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default OrderHistory;
