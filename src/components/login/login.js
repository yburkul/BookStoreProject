import React, { useState } from "react";
import SignupPage from "../signup/signup";
import { useNavigate } from "react-router-dom";
import './login.css';
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const userPasswordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

function LoginPage() {
  const [createAccount, setCreateAccount] = useState(false);
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInputs({ ...userInputs, [name]: value });
    setValidationErrors({
      ...validationErrors,
      email: name === "email" ? "" : validationErrors.email,
      password: name === "password" ? "" : validationErrors.password,
    });
    validateInput(name, value);
    setLoginError("");
  };

  const validateInput = (name, value) => {
    switch (name) {
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
            : "Invalid Password, at least 8+ characters,uppercase,digit,special character.",
        });
        break;
      default:
        break;
    }
  };

  const handleLogIn = (event) => {
    event.preventDefault();

    if (
      Object.values(validationErrors).every((error) => error === "") &&
      userInputs.email &&
      userInputs.password
    ) {
      
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
      const existingUser = storedUserInfo.find(
        (user) =>
          user.email === userInputs.email &&
          user.password === userInputs.password
      );
      if (existingUser) {
        const updatedUsers = storedUserInfo.map((user) =>
          user.email === userInputs.email ? { ...user, isLoggedIn: true } : user
        );

        localStorage.setItem("userInfo", JSON.stringify(updatedUsers));
        setLoginError("");
        navigate("/books");
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
    } else {
      setLoginError("Please fix the errors and try again.");
    }
  };
  return (
    <>
      {!createAccount ? (
        <div
          className="container col text-center shadow p-4 mb-3 bg-white rounded login-box"
        >
          <div className="login-input-box">
            <div class="mt-4">
              <h2>Sign in to your account</h2>
            </div>
            <form className="m-4 login-form-box">
              <div class="form-floating m-3 ">
                <input
                  type="email"
                  className={`form-control ${
                    validationErrors.email ? "is-invalid" : ""
                  }`}
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={userInputs.email}
                  onChange={handleInputChange}
                />
                <label for="floatingInput">Email address</label>
                <div className="invalid-feedback text-start">
                  {validationErrors.email}
                </div>
              </div>
              <div class="form-floating m-3">
                <input
                  type="password"
                  className={`form-control ${
                    validationErrors.password ? "is-invalid" : ""
                  }`}
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={userInputs.password}
                  onChange={handleInputChange}
                />
                <label for="floatingPassword">Password</label>
                <div className="invalid-feedback text-start">
                  {validationErrors.password}
                </div>
              </div>
              {loginError && (
                <div className="text-danger mb-1">{loginError}</div>
              )}
              <div class="col">
                <button
                  type="submit"
                  className="btn btn-primary m-1"
                  onClick={handleLogIn}
                >
                  Login
                </button>
              </div>
              <div class="col mt-2">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => setCreateAccount(true)}
                >
                  New to Book Store? Create an account
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <SignupPage setCreateAccount={setCreateAccount} />
      )}
    </>
  );
}

export default LoginPage;