import React, { useState } from "react";
import Header from "../header/header";
import "./profile.css";
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const userPasswordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;
const userNameRegex = /^[A-Z][a-zA-Z-' ]{2,}$/;

function Profile() {
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const currentUser = storedUserInfo.find((user) => user.isLoggedIn);
  const [userInputs, setUserInputs] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInputs({ ...userInputs, [name]: value });
    validateInput(name, value);
  };
  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        setValidationErrors({
          ...validationErrors,
          name: userNameRegex.test(value) ? "" : "Enter correct Name",
        });
        break;
      case "email":
        setValidationErrors({
          ...validationErrors,
          email: emailRegex.test(value) ? "" : "Enter correct email address",
        });
        break;
      case "password":
        setValidationErrors({
          ...validationErrors,
          password: userPasswordRegex.test(value)
            ? ""
            : "at least 8+ characters,uppercase,digit,special character.",
        });
        break;
      case "confirmPassword":
        setValidationErrors({
          ...validationErrors,
          confirmPassword:
            value === userInputs.password ? "" : "Passwords do not match",
        });
        break;
      default:
        break;
    }
  };

  const isAnyInputEmpty = Object.values(userInputs).some((value) => !value);

  const updateProfile = (event) => {
    event.preventDefault();

    const currentUserIndex = storedUserInfo.findIndex(
      (user) => user.isLoggedIn
    );

    if (currentUserIndex !== -1) {
      // Update the current user's information
      storedUserInfo[currentUserIndex] = {
        ...currentUser,
        name: userInputs.name,
        email: userInputs.email,
        password: userInputs.password,
      };

      localStorage.setItem("userInfo", JSON.stringify(storedUserInfo));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      console.log("User not found in local storage.");
    }
  };
  return (
    <>
      <Header />
      <div className="container col text-start p-1 bg-white profile-update-form">
        <h2 class="m-4">Updated Profile</h2>
        <form class="col text-start m-4 mt-0 g-3">
          <div class={`col mb-2`}>
            <label for="validationDefault01" class="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.name ? "is-invalid" : ""
              }`}
              id="validationDefault01"
              name="name"
              value={userInputs.name}
              onChange={handleInputChange}
              placeholder="name"
              required
            />
            <div className="invalid-feedback ">{validationErrors.name}</div>
          </div>

          <div class={`col mb-2`}>
            <label for="validationDefaultUsername" class="form-label">
              Username
            </label>
            <div class="input-group">
              <span class="input-group-text" id="inputGroupPrepend2">
                @
              </span>
              <input
                type="text"
                className={`form-control ${
                  validationErrors.email ? "is-invalid" : ""
                }`}
                id="validationDefaultUsername"
                placeholder="email"
                name="email"
                value={userInputs.email}
                onChange={handleInputChange}
                required
              />
              <div className="invalid-feedback">{validationErrors.email}</div>
            </div>
          </div>

          <div class={`col mb-2`}>
            <label for="validationDefault03" class="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                validationErrors.password ? "is-invalid" : ""
              }`}
              id="validationDefault03"
              placeholder="password"
              name="password"
              value={userInputs.password}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{validationErrors.password}</div>
          </div>
          <div class={`col mb-2`}>
            <label for="validationDefault05" class="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                validationErrors.confirmPassword ? "is-invalid" : ""
              }`}
              id="validationDefault05"
              placeholder="confirm password"
              name="confirmPassword"
              value={userInputs.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">
              {validationErrors.confirmPassword}
            </div>
          </div>
          <div class="col text-start  mb-2">
            <button
              class="btn btn-primary"
              type="submit"
              onClick={updateProfile}
              disabled={isAnyInputEmpty}
            >
              Update info
            </button>
          </div>
        </form>
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
            <div class="toast-body">Profile update successful!</div>
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
    </>
  );
}
export default Profile;
