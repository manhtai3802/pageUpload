import { createAction, createReducer, current, nanoid } from '@reduxjs/toolkit';
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

export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
  return {
    payload: {
      ...post,
      id: nanoid(),
    },
  };
});
export const deletePost = createAction<string>('blog/deletePost');
export const startEditingPost = createAction<string>('blog/startEditingPost');
export const cancelEditingPost = createAction('blog/cancelEditingPost');
export const finishEditingPost = createAction<Post>('blog/finishEditingPost');

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
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null;
    })
    .addCase(finishEditingPost, (state, action) => {
      const postID = action.payload.id;
      state.postList.some((post, index) => {
        if (post.id === postID) {
          state.postList[index] = action.payload;
          return true;
        }
        return false;
      });
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state) => {
        console.log(current(state));
      },
    );
});

export default blogReducer;
