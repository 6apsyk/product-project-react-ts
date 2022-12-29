export { ArticlesViewSelector } from './ui/ArticlesViewSelector/ArticlesViewSelector'

export { 
    getArticlePageError, 
    getArticlePageIsLoading, 
    getArticlePageView,
    getArticlePageNumber,
    getArticlePageLimit,
    getArticlePageHasMore 
} from './model/selectors/articles'

export { 
    fetchArticleList 
} from './model/services/fetchArticleList/fetchArticleList'

export { 
    articlesPageAction, 
    articlesPageReducer 
} from './model/slice/articlesPageSlice'

export {
    articlesPageSchema
} from './model/types/articlesPageSchema'


