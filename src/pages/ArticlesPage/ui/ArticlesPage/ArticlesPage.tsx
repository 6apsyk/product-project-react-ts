import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import cls from './ArticlesPage.module.scss';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { 
    articlesPageReducer, 
    ArticlesViewSelector, 
    fetchArticleList, 
    fetchNextArticlePage, 
    getArticlePageError, 
    getArticlePageHasMore, 
    getArticlePageIsLoading, 
    getArticlePageNumber, 
    getArticlePageView 
} from 'features/ArticleList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { articlesPageAction, getArticles } from 'features/ArticleList/model/slice/articlesPageSlice';
import { ArticleView } from 'entities/Article';
import { Page } from 'shared/ui/Page/Page';

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

    const onViewClick = (view: ArticleView) => {
        dispatch(articlesPageAction.setView(view))
    }

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlePage())      
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(articlesPageAction.initView())
        dispatch(fetchArticleList({
            page : 1
        }))
    })

    if (articlesPageError){
        return <Page>{t('ОШИБКА')}</Page>
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticlesPage, {}, [className])} onScrollEnd={onLoadNextPart}>
                <ArticlesViewSelector view={articlesPageView} onViewClick={onViewClick}/>
                <ArticleList 
                    articles={articles} 
                    view={articlesPageView} 
                    isLoading={articlesPageIsLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
