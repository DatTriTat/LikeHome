import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, userExisted , updateUser} from "../../firebaseFunction";

export const createUserWithEmailAndPass = createAsyncThunk(
  "/user",
  async (userObj) => {
    let data = await userExisted(userObj);
    if (data) {
      alert("Account in used");
      return false;
    }
    data = await createUser(userObj);
    return true;
  }
);
export const loginUserWithEmailAndPass = createAsyncThunk(
  "user/loging",
  async (userObj) => {
    let data = await getData(userObj);
    return data;
  }
);

export const UpdateProfile = createAsyncThunk(
  "user/profile",
  async (objUser) => {
    let data = await updateUser(objUser);
    return data;
  }
);

export const reservationHist = createAsyncThunk(
  "user/profile/reservation",
  async (objUser) => {
    let data = await historyReservation(objUser);
    return data;
  }
);


const initialState = {
  user: {},
  signUp: {
    status: true,
  },
  login: {
    status: false,
  },
  reservationHist: {
    reservations: {},
    isLoading: true
  }
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reload: (state, action) => {
      state.signUp.status = true;
    },
    userSignOut: (state, action) => {
      state.login.status = false;
      state.signUp.status = true;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserWithEmailAndPass.fulfilled, (state, action) => {
      if (action.payload) state.signUp.status = action.payload;
    });
    builder.addCase(loginUserWithEmailAndPass.fulfilled, (state, action) => {
      if (action.payload) state.login.status = true;
      state.signUp.status = false;
      state.user = action.payload;
    });
    builder.addCase(UpdateProfile.fulfilled, (state, action) => {
      if (action.payload) state.login.status = true;
      state.user = action.payload;
    });
    builder.addCase(reservationHist.fulfilled, (state, action) => {
      if (action.payload) state.reservationHist.isLoading = false;
      state.reservationHist.reservations = action.payload;
    });
  },
});

export const { reload, userSignOut } = accountSlice.actions;

export default accountSlice.reducer;
