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

    const onLoadNextPart = useCallback(() => {
        if (__PROJECT__ !== 'storybook'){
            dispatch(fetchNextArticlePage()) 
        }
             
    }, [dispatch])

    useInitialEffect(() => {
        if (!init){
            dispatch(articlesPageAction.initView())
            dispatch(fetchArticleList({
                page : 1
            }))
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
