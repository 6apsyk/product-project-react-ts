import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import cls from './ArticlesPage.module.scss';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { 
    articlesPageReducer,
    fetchArticleList, 
    fetchNextArticlePage, 
    getArticlePageError,
    getArticlePageInit,
    getArticlePageIsLoading,
    getArticlePageView 
} from 'features/ArticleList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { articlesPageAction, getArticles } from 'features/ArticleList/model/slice/articlesPageSlice';

import { Page } from 'shared/ui/Page/Page';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { useSearchParams } from 'react-router-dom';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types/article';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const articlesPageIsLoading = useSelector(getArticlePageIsLoading)
    const articlesPageError = useSelector(getArticlePageError)
    const articlesPageView = useSelector(getArticlePageView)
    const init = useSelector(getArticlePageInit)

    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        if (__PROJECT__ !== 'storybook'){
            dispatch(fetchNextArticlePage()) 
        }
             
    }, [dispatch])

    useInitialEffect(() => {
        if (!init){

            const newOrder = searchParams.get('order') as SortOrder
            const newSort = searchParams.get('sort')  as ArticleSortField
            const newSearch = searchParams.get('search')
            const newType = searchParams.get('type') as ArticleType

            if(newOrder) dispatch(articlesPageAction.setOrder(newOrder))
            if(newSort) dispatch(articlesPageAction.setField(newSort))
            if(newSearch) dispatch(articlesPageAction.setSearch(newSearch))
            if(newType) dispatch(articlesPageAction.setType(newType))

            dispatch(articlesPageAction.initView())
            dispatch(fetchArticleList({}))
        }
        
    })

    if (articlesPageError){
        return <Page>{t('ОШИБКА')}</Page>
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page className={classNames(cls.ArticlesPage, {}, [className])} onScrollEnd={onLoadNextPart}>
                <ArticlesPageFilters/>
                <ArticleList 
                    articles={articles} 
                    view={articlesPageView} 
                    isLoading={articlesPageIsLoading}
                    className={cls.list}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
