import { createSlice } from '@reduxjs/toolkit';

let initialState: {imageString:string} = {
  imageString: '',
};

export const imageSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setImageString(state, action) {
      state.imageString = action.payload;
    },
    resetImageStringToInitalState(state) {
      state.imageString = initialState.imageString;
    },
  },
});

export const { setImageString } = imageSlice.actions;

export default imageSlice.reducer;
