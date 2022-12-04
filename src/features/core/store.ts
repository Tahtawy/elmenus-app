import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/AuthSlice";
import adminSlice from "../admin/AdminSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

export default Store;
