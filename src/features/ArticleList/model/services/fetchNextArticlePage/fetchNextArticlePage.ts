import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getArticlePageHasMore, getArticlePageIsLoading, getArticlePageNumber } from "../../selectors/articles"
import { articlesPageAction } from "../../slice/articlesPageSlice"
import { fetchArticleList } from "../fetchArticleList/fetchArticleList"


export const fetchNextArticlePage = createAsyncThunk<
    void,
    void, 
    ThunkConfig<string>
>
(
    'articles/fetchNextArticlePage',
    async (_, thunkAPI) => {

        const {getState, dispatch} = thunkAPI

        const hasMore = getArticlePageHasMore(getState())
        const isLoading = getArticlePageIsLoading(getState())
        const page = getArticlePageNumber(getState())


        if(hasMore && !isLoading){
            dispatch(articlesPageAction.setPage(page + 1))
            dispatch(fetchArticleList({
                page : page + 1
            }))
        }   
    }
)