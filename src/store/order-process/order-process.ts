import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OrderProcess } from '../../types/state';
import { sendOrderAction} from '../api-actions';

const initialState: OrderProcess = {
  orderStatus: undefined,
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendOrderAction.pending, (state) => {
        state.orderStatus = undefined;
      })
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.orderStatus = true;
      })
      .addCase(sendOrderAction.rejected, (state) => {
        state.orderStatus = false;
      });
  },
});
