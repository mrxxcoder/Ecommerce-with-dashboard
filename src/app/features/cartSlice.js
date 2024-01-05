import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts
      );
    },

    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
      toast({
        title: "Product removed from your cart",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },

    clearCart: (state) => {
      state.cartProducts = [];
      toast({
        title: "Cart cleared out",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = ({ cart }) => cart;
export default cartSlice.reducer;
