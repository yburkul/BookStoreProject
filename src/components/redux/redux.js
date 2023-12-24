import { createSlice, configureStore } from "@reduxjs/toolkit";

const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || [];

const loggedInUser = storedUserInfo.find((user) => user.isLoggedIn);
let user_Id;

if (loggedInUser) {
  user_Id = loggedInUser.userId;
} else {
  console.log("No user is logged in");
}

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem(`cart_${user_Id}`);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      // Ensure state.cartItems is an array or initialize it as an empty array
      state.cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];

      // Now you can safely spread the array and add the new item
      state.cartItems = [...state.cartItems, action.payload];
      localStorage.setItem(`cart_${user_Id}`, JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem(`cart_${user_Id}`, JSON.stringify(state.cartItems));
    },
    resetCart: (state) => {
      state.cartItems = Array.isArray(state.cartItems) ? [] : state.cartItems;
      localStorage.setItem(`cart_${user_Id}`, JSON.stringify(state.cartItems));
    },

  },
});

export const { addToCart, removeFromCart, resetCart } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;
const combineReducers = {
  cart: cartReducer,
};
export const store = configureStore({
  reducer: combineReducers,
});
