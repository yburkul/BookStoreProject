import React, { useContext, useEffect, useState } from "react";
import "./ShoppingAddress.css";

import { myBasket } from "../shoppingPage/shoppingPage";

const ShoppingAddress = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUser = storedUserInfo.find((user) => user.isLoggedIn);

  let user_Id;

  if (loggedInUser) {
    user_Id = loggedInUser.userId;
  } else {
    alert("No user is logged in");
  }

  useEffect(() => {
    // Load stored userAddress from localStorage on component mount
    const storedUserAddress = localStorage.getItem(`${user_Id}_Address`);
    if (storedUserAddress) {
      setShippingInfo(JSON.parse(storedUserAddress));
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };
  const { setTab } = useContext(myBasket);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(`${user_Id}_Address`, JSON.stringify(shippingInfo));
    setTab("Payment Method");
  };

  return (
    <>
      <div className="checkout-form text-start">
        <h4>Shopping Address</h4>
        <form class="text-start" onSubmit={handleSubmit}>
          <div class="form-row m-2">
            <div class="form-group col-md-6">
              <label for="inputName4">Name</label>
              <input
                type="text"
                class="form-control"
                id="inputName4"
                placeholder="Name"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div class="form-group m-2">
            <label for="inputAddress">Address</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6 m-2">
              <label for="inputCity">City</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group col-md-6 m-2">
              <label for="inputState">State</label>
              <input
                type="text"
                class="form-control"
                id="inputState"
                placeholder="State"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group col-md-2 m-2">
              <label for="inputZip">Zip</label>
              <input
                type="text"
                class="form-control"
                id="inputZip"
                placeholder="Zip"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group col-md-6 m-2">
              <label for="inputCountry">Country</label>
              <input
                type="text"
                class="form-control"
                id="inputCountry"
                placeholder="Country"
                name="country"
                value={shippingInfo.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary m-2">
            Next
          </button>
        </form>
      </div>
    </>
  );
};

export default ShoppingAddress;
