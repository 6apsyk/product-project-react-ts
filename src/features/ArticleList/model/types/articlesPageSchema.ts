import { EntityState } from "@reduxjs/toolkit"
import { Article, ArticleSortField, ArticleView } from "entities/Article"
import { ArticleType } from "entities/Article/model/types/article"
import { SortOrder } from "shared/types"

export interface articlesPageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string

    //pagination
    limit: number
    view: ArticleView
    page: number
    hasMore?: boolean

    //filter
    order: SortOrder
    field: ArticleSortField
    search: string
    type: ArticleType

    _init: boolean
}