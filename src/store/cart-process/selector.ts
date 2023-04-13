import { Camera } from '../../types/camera';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCartProducts = (state: State): Camera[] => state[NameSpace.Cart].cartProducts;
