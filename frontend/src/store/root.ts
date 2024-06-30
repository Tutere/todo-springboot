import { create } from "domain"
import { combineReducers, createStore } from "redux";
import taskReducer from "./tasks"
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";


// export const configureStore = () => {
//     return createStore(
//         combineReducers({
//             tasks: taskReducer,
//         })
//     )
// }

const store = configureStore({
    reducer: {
      tasks: taskReducer}
  })

export default store;


/* BELOW IS FROM REDUX DOCS */

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()