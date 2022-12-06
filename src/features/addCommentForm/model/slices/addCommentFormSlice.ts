import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCommentForArticle } from '../services/addCommentForArticle';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    text: '',
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCommentForArticle.pending, (state) => {
                state.error = undefined;
                // state.isLoading = true;
            })
            .addCase(addCommentForArticle.fulfilled, (state) => {
                // state.isLoading = false;
            })
            .addCase(addCommentForArticle.rejected, (state, action) => {
                // state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
