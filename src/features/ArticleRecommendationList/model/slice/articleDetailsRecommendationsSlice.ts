import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { articleDetailsRecommendationsSchema } from '../types/articleDetailsRecommendationsSchema'
import { Article } from 'entities/Article'
import { fetchRecommendations } from '../services/fetchRecommendations/fetchRecommendations'
  
const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsRecommendations || recommendationsAdapter.getInitialState() 
)
  
const articleDetailsRecommendationsSlice = createSlice({
    name: 'recommendations',
    initialState: recommendationsAdapter.getInitialState<articleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        entities: {},
        ids: []
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.isLoading = false
                recommendationsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const {reducer: articleDetailsRecommendationsReducer} = articleDetailsRecommendationsSlice
  