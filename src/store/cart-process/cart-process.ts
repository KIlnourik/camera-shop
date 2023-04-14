import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CartProcess } from '../../types/state';
import { Camera } from '../../types/camera';

const initialState: CartProcess = {
  cartProducts: []
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Camera>) => {
      state.cartProducts.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<Camera>) => {
      state.cartProducts = [...state.cartProducts].filter((product) => product.id !== action.payload.id);
    },
    increaseProducts: (state, action: PayloadAction<Camera>) => {
      state.cartProducts.fill({length: {...action.payload}}, );
    },
    decreaseProducts: (state, action: PayloadAction<Camera>) => {
      const index = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      state.cartProducts.splice(index, 1);
    }
  },
});

export const { addToCart, removeProduct, decreaseProducts } = cartProcess.actions;
