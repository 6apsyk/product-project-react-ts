import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import { getArticlePageLimit } from "../../selectors/articles"

interface FetchArticleListProps {
    page: number
}

export const fetchArticleList = createAsyncThunk<Article[], FetchArticleListProps, ThunkConfig<string>>
(
    'articles/fetchArticleList',
    async (arg, thunkAPI) => {

        const {page = 1} = arg

        const {extra, rejectWithValue, getState} = thunkAPI

        const limit = getArticlePageLimit(getState())

        try {
            
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit
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