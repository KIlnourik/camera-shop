import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOrderStatus = (state: State): boolean | undefined => state[NameSpace.Order].orderStatus;
