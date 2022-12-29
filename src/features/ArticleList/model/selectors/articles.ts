import { StateSchema } from "app/providers/StoreProvider";

export const getArticlePageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading
export const getArticlePageError = (state: StateSchema) => state.articlesPage?.error
export const getArticlePageView = (state: StateSchema) => state.articlesPage?.view

export const getArticlePageNumber = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlePageLimit = (state: StateSchema) => state.articlesPage?.limit || 9
export const getArticlePageHasMore = (state: StateSchema) => state.articlesPage?.hasMore
