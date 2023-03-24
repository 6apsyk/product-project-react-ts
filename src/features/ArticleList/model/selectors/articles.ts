import { StateSchema } from "app/providers/StoreProvider";
import { ArticleSortField } from "entities/Article";

export const getArticlePageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading
export const getArticlePageError = (state: StateSchema) => state.articlesPage?.error
export const getArticlePageView = (state: StateSchema) => state.articlesPage?.view

export const getArticlePageNumber = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlePageLimit = (state: StateSchema) => state.articlesPage?.limit
export const getArticlePageHasMore = (state: StateSchema) => state.articlesPage?.hasMore
export const getArticlePageInit = (state: StateSchema) => state.articlesPage?._init

export const getArticlePageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc'
export const getArticlePageField = (state: StateSchema) => state.articlesPage?.field ?? ArticleSortField.CREATED
export const getArticlePageSearch = (state: StateSchema) => state.articlesPage?.search ?? ''

