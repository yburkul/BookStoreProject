import React, { createContext, useState } from "react";
import PaymentMethod from "../paymentMethod/paymentMethod";
import "./shoppingPage.css";
import PlaceOrder from "../placeOrder/placeOrder";
import ShoppingAddress from "../shoppingAddress/ShoppingAddress";
import Header from "../header/header";

export const myBasket = createContext();
function ShoppingPage() {
  const [currentTab, setCurrentTab] = useState("Shopping Address");
  const tabs = ["Shopping Address", "Payment Method", "Place Order"];

  return (
    <div>
      <Header />
      <header
        className="d-flex justify-content-evenly align-items-center "
        style={{ width: "90%" }}
      >
        {tabs.map((tab, index) => (
          <ul key={index} className={`m-3`}>
            <li class="nav-item row">
              <a
                class={`nav-link text-dark`}
                style={{
                  borderBottom: currentTab === tab ? "2px solid green" : "",
                }}
              >
                <h6> {tab}</h6>
              </a>
            </li>
          </ul>
        ))}
      </header>
      <hr className="divider-hr" />
      <myBasket.Provider value={{ setTab: setCurrentTab }}>
        {currentTab == "Shopping Address" && <ShoppingAddress />}
        {currentTab == "Payment Method" && <PaymentMethod />}
        {currentTab == "Place Order" && <PlaceOrder />}
      </myBasket.Provider>
    </div>
  );
}

export default ShoppingPage;
