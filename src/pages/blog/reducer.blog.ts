import { createAction, createReducer } from '@reduxjs/toolkit';
import { initialPostList } from '../../constants/blog';
import { Post } from '../../types/blog.type';

interface BlogState {
  postList: Post[];
  editingPost: Post | null;
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null,
};

export const addPost = createAction<Post>('blog/addPost');
export const deletePost = createAction<string>('blog/deletePost');
export const startEditingPost = createAction<string>('blog/startEditingPost');

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload;
      state.postList.push(post);
    })
    .addCase(deletePost, (state, action) => {
      const postID = action.payload;
      const foundPostIndex = state.postList.findIndex((post) => post.id === postID);
      if (foundPostIndex !== -1) state.postList.splice(foundPostIndex, 1);
    })
    .addCase(startEditingPost, (state, action) => {
      const postID = action.payload;
      const foundPost = state.postList.find((post) => post.id === postID) || null;
      state.editingPost = foundPost;
    });
});

export default blogReducer;