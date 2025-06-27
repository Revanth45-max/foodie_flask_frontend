import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
// We will modify the existing Meals component to include the summary and list
import Meals from "./components/Meals/Meals";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "./store/cartSlice";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import React from 'react';
//import MealList from "./components/Meals/MealList";
// MealsList is imported but not used directly in App.js; it will be used inside Meals.js
// import MealsList from "./components/Meals/MealList";

function App() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.ui.showModal);

  // Synchronizes the redux state with the localStorage data when the component is mounted.
  useEffect(() => {
    try {
      const localStorageData = JSON.parse(localStorage.getItem("cart"));

      if (localStorageData) {
        dispatch(cartActions.replaceCart(localStorageData));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            items: [],
            totalQuantity: 0,
          })
        );
      }
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: [],
          totalQuantity: 0,
        })
      );
    }
  }, [dispatch]);

  return (
    <Fragment>
      <ToastContainer stacked />
      {showModal && <Cart />}
      <Header />
      {/* The main content area where MealsSummary and MealsList will reside */}
      <Meals />
      <Footer />
    </Fragment>
  );
}

export default App;