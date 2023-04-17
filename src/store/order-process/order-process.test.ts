import { orderProcess } from './order-process';
import {
  sendOrderAction,
} from '../api-actions';

describe('Reducer: couponProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(orderProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        orderStatus: undefined,
      });
  });

  it('should send Order', () => {
    const state = {
      orderStatus: undefined,
    };
    expect((orderProcess.reducer(state, { type: sendOrderAction.fulfilled.type, payload: true })))
      .toEqual({
        orderStatus: true,
      });
  });

  it('should reject sending Order', () => {
    const state = {
      orderStatus: undefined,
    };
    expect((orderProcess.reducer(state, { type: sendOrderAction.rejected.type, payload: true })))
      .toEqual({
        orderStatus: false,
      });
  });

});
