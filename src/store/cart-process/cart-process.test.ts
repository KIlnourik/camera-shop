import { orderProcess } from '../order-process/order-process';
import {
  sendOrderAction,
} from '../api-actions';

describe('Reducer: orderProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(orderProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        orderStatus: undefined,
      });
  });

  it('should validate Coupon', () => {
    const state = {
      orderStatus: undefined,
    };
    expect((orderProcess.reducer(state, { type: sendOrderAction.fulfilled.type, payload: true })))
      .toEqual({
        orderStatus: true,
      });
  });
  it('should reject sending order', () => {
    const state = {
      orderStatus: undefined,
    };
    expect((orderProcess.reducer(state, { type: sendOrderAction.rejected.type, payload: true })))
      .toEqual({
        orderStatus: false,
      });
  });

});
