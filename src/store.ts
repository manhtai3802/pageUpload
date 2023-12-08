import {configureStore} from '@reduxjs/toolkit'
import blogReducer from './pages/blog/reducer.blog'

 export const store =configureStore({
  reducer: {
    blog: blogReducer
  }
 })

 //Lấy rootState và appDispatch từ store
 export type RootState = ReturnType<typeof store.getState>

 export type AppDispatch = typeof store.dispatch