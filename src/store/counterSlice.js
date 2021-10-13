import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// const fetchUserById = (userId) => {
//   // the inside "thunk function"
//   return async (dispatch, getState) => {
//     try {
//       // make an async call in the thunk
//       const user = await userAPI.fetchById(userId);
//       // dispatch an action when we get the response back
//       dispatch(userLoaded(user));
//     } catch (err) {
//       // If something went wrong, handle it here
//     }
//   };
// };

export default counterSlice.reducer;
