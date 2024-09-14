import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import postReducer from "./slices/post";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  post: postReducer
}

export const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
