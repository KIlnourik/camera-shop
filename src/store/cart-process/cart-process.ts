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
    }
  },
});

export const { addToCart } = cartProcess.actions;
