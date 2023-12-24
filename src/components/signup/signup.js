import React, { useState } from "react";
import "./signup.css";
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const userPasswordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;
const userNameRegex = /^[A-Z][a-zA-Z-' ]{2,}$/;

function SignupPage({ setCreateAccount }) {
  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const generateUserId = () => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 15);

    return `${timestamp}${random}`;
  };

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

  const register = (event) => {
    event.preventDefault();

    if (
      Object.values(validationErrors).every((error) => error === "") &&
      !isAnyInputEmpty
    ) {
      const userDetails = {
        userId: generateUserId(),
        name: userInputs.name,
        email: userInputs.email,
        password: userInputs.password,
        isLoggedIn: false,
      };
      let existingUsers = JSON.parse(localStorage.getItem("userInfo")) || [];

      if (existingUsers.some((user) => user.email === userDetails.email)) {
        setValidationErrors({
          ...validationErrors,
          email: "Email is already registered",
        });
        return;
      }

      existingUsers.push(userDetails);
      localStorage.setItem("userInfo", JSON.stringify(existingUsers));
      setRegistrationSuccess(true);
    } else {
      console.log("Registration failed. Please fix errors.");
    }
  };

  return (
    <div>
      <div className="container col text-center shadow p-3 bg-white rounded signup-box">
        <h2>Create an Account</h2>
        <form class="col text-start m-4 mt-0 g-3 sign-up-form">
          <div class={`col ${validationErrors.name ? "mb-0" : "mb-2"}`}>
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

          <div class={`col ${validationErrors.email ? "mb-0" : "mb-2"}`}>
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

          <div class={`col ${validationErrors.password ? "mb-0" : "mb-2"}`}>
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
          <div
            class={`col ${validationErrors.confirmPassword ? "mb-0" : "mb-2"}`}
          >
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
          {registrationSuccess ? (
            <div className="text-success m-4">
              Registration successful! You can now log in.
            </div>
          ) : (
            <div class="col mt-4 d-flex justify-content-center mb-2">
              <button
                class="btn btn-primary"
                type="submit"
                onClick={register}
                disabled={isAnyInputEmpty}
              >
                Sign up
              </button>
            </div>
          )}
          <div class="col text-center">
            <button
              type="button"
              class="btn btn-outline-primary not-allowed"
              onClick={() => setCreateAccount(false)}
            >
              Existing User? Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignupPage;
