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
    decreaseProducts: (state, action: PayloadAction<Camera>) => {
      const index = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      state.cartProducts.splice(index, 1);
    },
    setProductsCount: (state, action: PayloadAction<Camera[]>) => {
      state.cartProducts = [...state.cartProducts].filter((product) => product.id !== action.payload[0].id);
      state.cartProducts.push(...action.payload);
    }
  },
});

export const { addToCart, removeProduct, decreaseProducts, setProductsCount } = cartProcess.actions;
