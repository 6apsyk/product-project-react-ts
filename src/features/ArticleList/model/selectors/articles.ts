import { StateSchema } from "app/providers/StoreProvider";

export const getArticlePageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading
export const getArticlePageError = (state: StateSchema) => state.articlesPage?.error
export const getArticlePageView = (state: StateSchema) => state.articlesPage?.view