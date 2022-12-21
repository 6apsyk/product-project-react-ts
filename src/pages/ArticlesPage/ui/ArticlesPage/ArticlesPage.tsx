import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticlesPage.module.scss';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { 
    articlesPageReducer, 
    ArticlesViewSelector, 
    fetchArticleList, 
    getArticlePageError, 
    getArticlePageIsLoading, 
    getArticlePageView 
} from 'features/ArticleList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { articlesPageAction, getArticles } from 'features/ArticleList/model/slice/articlesPageSlice';
import { Button } from 'shared/ui/Button/Button';
import { ArticleView } from 'entities/Article';

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

    useInitialEffect(() => {
        dispatch(fetchArticleList())
        dispatch(articlesPageAction.initView())
    })

    if (articlesPageError){
        return <div>{t('ОШИБКА')}</div>
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticlesViewSelector view={articlesPageView} onViewClick={onViewClick}/>
                <ArticleList 
                    articles={articles} 
                    view={articlesPageView} 
                    isLoading={articlesPageIsLoading}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
