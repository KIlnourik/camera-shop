import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProcess } from './data-process/data-process';
// import { catalogProcess } from './catalog-process/catalog-process';
// import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  // [NameSpace.Catalog]: catalogProcess.reducer,
});
