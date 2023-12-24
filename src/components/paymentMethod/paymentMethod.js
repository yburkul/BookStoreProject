import React, { useContext, useEffect, useState } from "react";
import { myBasket } from "../shoppingPage/shoppingPage";
import "./paymentMethod.css";

function PaymentMethod() {
  const { setTab } = useContext(myBasket);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  function handleBackClick() {
    setTab("Shopping Address");
  }
  function handleNextClick() {
    localStorage.setItem(
      "selectedPaymentMethod",
      JSON.stringify(selectedPaymentMethod)
    );
    setTab("Place Order");
  }
  useEffect(() => {
    const storedPaymentMethod = localStorage.getItem("selectedPaymentMethod");
    if (storedPaymentMethod) {
      setSelectedPaymentMethod(JSON.parse(storedPaymentMethod));
    }
  }, []);
  function handleRadioChange(e) {
    setSelectedPaymentMethod(e.target.value);
  }
  return (
    <div class="payment-method-box d-flex flex-column align-items-start justify-content-start">
      <h5 class="m-2">Payment Method</h5>
      <div class="form-check m-2">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="PayPal"
          onChange={handleRadioChange}
          checked={selectedPaymentMethod === "PayPal"}
        />
        <label class="form-check-label" for="flexRadioDefault1">
          PayPal
        </label>
      </div>
      <div class="form-check m-2">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value="Phone Pe"
          onChange={handleRadioChange}
          checked={selectedPaymentMethod === "Phone Pe"}
        />
        <label class="form-check-label" for="flexRadioDefault2">
          Phone Pe
        </label>
      </div>
      <div class="form-check m-2">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault3"
          value="CashOnDelivery"
          onChange={handleRadioChange}
          checked={selectedPaymentMethod === "CashOnDelivery"}
        />
        <label class="form-check-label" for="flexRadioDefault3">
          CashOnDelivery
        </label>
      </div>
      <div className="back-next-button d-flex flex-row align-items-center justify-content-between">
        <button
          type="button"
          class="btn btn-primary m-2"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          type="button"
          class="btn btn-primary m-2"
          disabled={!selectedPaymentMethod}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PaymentMethod;
