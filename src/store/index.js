import { configureStore } from '@reduxjs/toolkit';
import counter from './counterSlice';
import app from './appSlice';

export default configureStore({
  reducer: {
    counter,
    app,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
