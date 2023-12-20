import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  message: "",
  token: "",
  user: "",
  loading: false,
  error: "",
  forget_message: "",
};

// for login
export const SignInUser = createAsyncThunk(
  "user/signInUser",
  async (body, thunkAPI) => {
    const reResult = await fetch("http://localhost:9000/user/userLogin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await reResult.json();
    if (data.success) {
      console.log("res result is", reResult);
      console.log("data is", data);
      // for error message
      console.log("***", data.success, data);
      return data;
    } else {
      console.log("wrong data", data);
      return thunkAPI.rejectWithValue(data);
    }
  }
);

// For signup
export const SignUpUser = createAsyncThunk(
  "users/signUpUser",
  async (requestData, { rejectWithValue }) => {
    // Make the API call using Axios
    const response = await axios.post(
      "http://localhost:9000/user/registerUser",
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Return the response data
    return response;
  }
);
export const forgetpassword=createAsyncThunk(
  "users/forgetpassword",
  async(requestData,{rejectWithValue})=>{
    const response=await axios.post(
      "http://localhost:9000/user/send-reset-password-email",
      requestData,
      {
        headers:{
          "Content-Type":"application/json"
        },
      }
    );
    return response;
  }
);

export const ResetPasswords=createAsyncThunk(
  "users/reset",
  async(requestData,{rejectWithValue})=>{
    const response=await axios.post(
      "http://localhost:9000/user/reset-password",
      requestData,
      {
        headers:{
          "Content-Type":"application/json"
        },
      }
    );
    return response;
  }
);



const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.message = "";
      state.error = "";
    },
  },

  extraReducers: {
    [SignInUser.pending]: (state) => {
      state.loading = true;
    },
    [SignInUser.fulfilled]: (state, { payload }) => {
      // console.log("this is state", state);
      state.loading = false;
      console.log("payload fulfilled:", payload);
      // console.log(typeof payload);
      // console.log("_", payload.success);
      if (payload.success) {
        console.log("inside payload success");
        state.message = payload.message;
        state.token = payload.token;
        state.user = payload.userData;
        localStorage.setItem("message", payload.message);
        localStorage.setItem("user", JSON.stringify(payload.userData));
        localStorage.setItem("token", payload.token);
        console.log("successful");
      } else {
        state.error = payload.error;
        // if promise is not fullfilled then it will run
      }
    },
    [SignInUser.rejected]: (state, { payload }) => {
      console.log("this is rejected", payload);
      state.loading = false;
      state.error = payload.message;
      state.message = "Login Failed";
    },

    // for signup
    //reducers for action send by createAsyncThunk
    [SignUpUser.pending]: (state, { payload }) => {
      console.log("loading....");
      state.loading = true;
    },
    [SignUpUser.fulfilled]: (state, { payload }) => {
      console.log("Done", payload);
      state.loading = false;
      state.message = payload.data.message;
    },
    [SignUpUser.rejected]: (state, payload) => {
      state.error = payload.error.message;
      state.loading = false;
    },
    //for forgetpassword
    [forgetpassword.fulfilled]:(state,{payload})=>{
      state.loading=false;
      state.forget_message=payload.data.message
    },
    [forgetpassword.pending]:(state)=>{
      state.loading=true;
    },
    [forgetpassword.rejected]:(state,payload)=>{
      state.loading=false;
      state.error=payload.error.message


    },
    //for reset
    [ResetPasswords.pending]:(state)=>{
      state.loading=true;
    },
    [ResetPasswords.fulfilled]:(state,{payload})=>{
      state.loading=false;
      console.log("i fulfilled",payload)
      state.message=payload.data.message
    },
    [ResetPasswords.rejected]:(state,payload)=>{
      state.loading=false;
      console.log("i rejected",payload)
      state.error=payload.error.message
    }
  },
});

export default authSlice.reducer;
export const { clearState } = authSlice.actions;
