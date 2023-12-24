import React from "react";
import "./orderDetails.css";
import Header from "../header/header";

function OrderDetails() {
  const selectedOrder = JSON.parse(localStorage.getItem("selectedOrderItem"));
  const { name, address, city, state, zip, country } =
    selectedOrder.userAddress;
  const { subtotal, shippingCost, total } = selectedOrder.totalOrderCost;
  return (
    <div>
      <Header />
      <div className="order-details-container">
        <div className="d-flex flex-column align-items-start justify-content-start order-details-box">
          <h4 class="mb-4"> Order Id :- {selectedOrder.orderId}</h4>
          <div
            class="continer d-flex flex-column align-items-start justify-content-evenly mt-1 shadow p-3 bg-white rounded"
            style={{ width: "90%" }}
          >
            <h5 class="m-2">Shopping Address</h5>
            <p class="m-2">
              {name}, {address}, {city}, {state}, {zip}, {country}
            </p>
          </div>
          <div
            class="continer d-flex flex-column align-items-start justify-content-evenly mt-4 shadow p-3 bg-white rounded"
            style={{ width: "90%" }}
          >
            <h5 class="m-2">Payment Method</h5>
            <p class="m-2">{selectedOrder.userPayemntMethod}</p>
          </div>
          <div class="d-flex flex-column align-items-start justify-content-evenly mt-4 mb-2 shadow p-3 bg-white rounded order-table-box">
            <h5 class="m-2">Order Items</h5>
            <table class="table table-bordered m-2">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quntity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.items?.map((item) => {
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="details-total-order-price-box">
          <div className="details-order-price-box">
            <h5>Order Summary</h5>
            <div class="d-flex flex-row justify-content-between m-1 item-details-box">
              <span>Items</span>
              <span>{subtotal}₹</span>
            </div>
            <div class="d-flex flex-row justify-content-between m-1 item-details-box">
              <span>Delivery Charges</span>
              <span>{shippingCost}₹</span>
            </div>
            <hr
              style={{ border: "1px solid grey", width: "90%", margin: "0" }}
            />
            <div class="d-flex flex-row justify-content-between m-1 item-details-box">
              <p>Total</p>
              <p>{total}₹</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
