import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import { ArticleType } from "entities/Article/model/types/article"
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams"
import { getArticlePageField, 
    getArticlePageLimit, 
    getArticlePageNumber, 
    getArticlePageOrder, 
    getArticlePageSearch, 
    getArticlePageType
} from "../../selectors/articles"

interface FetchArticleListProps {
    replace?: boolean
}

export const fetchArticleList = createAsyncThunk<Article[], FetchArticleListProps, ThunkConfig<string>>
(
    'articles/fetchArticleList',
    async (arg, thunkAPI) => {

        const {extra, rejectWithValue, getState} = thunkAPI

        const limit = getArticlePageLimit(getState())
        const page = getArticlePageNumber(getState())
        const order = getArticlePageOrder(getState())
        const sort = getArticlePageField(getState())
        const search = getArticlePageSearch(getState())
        const type = getArticlePageType(getState())

        try {

            addQueryParams({
                sort, order, search, type
            })
            
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                    _order: order,
                    _sort: sort,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type
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