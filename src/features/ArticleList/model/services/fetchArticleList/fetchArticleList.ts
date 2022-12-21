import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"

export const fetchArticleList = createAsyncThunk<Article[], void, ThunkConfig<string>>
(
    'comments/fetchCommentsByArticleId',
    async (_, thunkAPI) => {

        const {extra, rejectWithValue} = thunkAPI

        try {
            
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user'
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