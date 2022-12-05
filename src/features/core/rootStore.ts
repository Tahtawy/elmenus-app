import menuSlice from "../menu/MenuSlice";
import authReducer from "../auth/AuthSlice";
import adminSlice from "../admin/AdminSlice";
import sharedSlice from "../shared/SharedSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootStore = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminSlice,
    shared: sharedSlice,
    menu: menuSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;

export default rootStore;
