import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article, ArticleSortField, ArticleView } from 'entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage'
import { SortOrder } from 'shared/types'
import { fetchArticleList } from '../services/fetchArticleList/fetchArticleList'
import { articlesPageSchema } from '../types/articlesPageSchema'
  
const articleAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticles = articleAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articleAdapter.getInitialState() 
)
  
const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState: articleAdapter.getInitialState<articlesPageSchema>({
        isLoading: false,
        error: undefined,
        entities: {},
        ids: [],
        view: ArticleView.BIG,
        page: 1,
        limit: 9,
        hasMore: true,
        _init: false,
        order: 'asc',
        field: ArticleSortField.CREATED,
        search: ''
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setField: (state, action: PayloadAction<ArticleSortField>) => {
            state.field = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        initView: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView
            state.view = view
            state.limit = state.view === ArticleView.BIG ? 4 : 9
            state._init= true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleList.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchArticleList.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false
                articleAdapter.addMany(state, action.payload)
                state.hasMore = action.payload.length > 0
            })
            .addCase(fetchArticleList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const {
    reducer: articlesPageReducer, 
    actions: articlesPageAction
} = articlesPageSlice
  