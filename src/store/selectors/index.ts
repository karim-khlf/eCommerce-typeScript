import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

const getCartItemsTotalNumber = createSelector(
  (state: RootState) => {
    return state.cart.items;
  },
  (items) => {
    const totalQuantity = Object.values(items).reduce((acc, cur) => {
      return (acc += cur);
    }, 0);
    return totalQuantity;
  }
);
export default getCartItemsTotalNumber;
