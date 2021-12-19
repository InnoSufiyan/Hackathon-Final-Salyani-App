import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickup: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setuserState: (state, action) => {
      state.userState = action.payload;
    },
    setPickup: (state, action) => {
      state.pickup = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    settravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setuserState, setPickup, setDestination, settravelTimeInformation } =
  navSlice.actions;

export const selectuserState = (state) => state.nav.userState;
export const selectPickup = (state) => state.nav.pickup;
export const selectDestination = (state) => state.nav.destination;
export const selecttravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
