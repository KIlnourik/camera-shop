import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CartProcess } from '../../types/state';
import { Camera } from '../../types/camera';

const initialState: CartProcess = {
  cartProducts: []
};

const sortCameras = (a:Camera, b:Camera) => {
  if (a.id > b.id) {
    return 1;
  }
  if (a.id < b.id) {
    return -1;
  }
  return 0;
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Camera>) => {
      state.cartProducts.push(action.payload);
      state.cartProducts.sort(sortCameras);
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
      state.cartProducts.sort(sortCameras);
    },
    resetCart: (state) => {
      state.cartProducts = [];
    }
  },
});

export const { addToCart, removeProduct, decreaseProducts, setProductsCount, resetCart } = cartProcess.actions;
