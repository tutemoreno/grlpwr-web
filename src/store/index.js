import { configureStore } from '@reduxjs/toolkit';
import counter from './counterSlice';

export default configureStore({
  reducer: {
    counter,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
