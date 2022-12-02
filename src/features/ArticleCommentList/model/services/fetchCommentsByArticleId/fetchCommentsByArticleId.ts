import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment"

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>
(
    'comments/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {

        const {extra, rejectWithValue} = thunkAPI

        if (!articleId) {
            rejectWithValue('error')
        }

        try {
            
            const response = await extra.api.get<Comment[]>(`/comments`, {
                params: {
                    _expand: 'user',
                    articleId
                }
            })

            if (!response.data) {
                throw new Error();
            }

            return response.data
        } catch (error) {
            return rejectWithValue('error')
        }        
    }
)