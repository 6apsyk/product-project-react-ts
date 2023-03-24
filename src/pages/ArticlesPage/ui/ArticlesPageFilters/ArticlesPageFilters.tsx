import {classNames} from 'shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { articlesPageAction, 
    ArticlesViewSelector, 
    getArticlePageField, 
    getArticlePageOrder, 
    getArticlePageSearch, 
    getArticlePageView 
} from 'features/ArticleList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { ArticleSortField, ArticleView } from 'entities/Article';
import { useSelector } from 'react-redux';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticlesSortSelector } from 'features/ArticleList/ui/ArticlesSortSelector/ArticlesSortSelector';
import { useCallback } from 'react';
import { SortOrder } from 'shared/types';

interface ArticlesPageFiltersProps {
 className?: string;
}

export const ArticlesPageFilters = ({ className }: ArticlesPageFiltersProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch()

    const articlesPageView = useSelector(getArticlePageView)
    const field = useSelector(getArticlePageField)
    const order = useSelector(getArticlePageOrder)
    const search = useSelector(getArticlePageSearch)

    const onViewClick = (view: ArticleView) => {
        dispatch(articlesPageAction.setView(view))
    }

    const onChangeField = useCallback((newField: ArticleSortField) => {
        dispatch(articlesPageAction.setField(newField))
    },[dispatch])

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageAction.setOrder(newOrder))
    },[dispatch])

    const onChangeSearch = useCallback((newSearch: string) => {
        dispatch(articlesPageAction.setSearch(newSearch))
    },[dispatch])

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticlesSortSelector 
                    order={order} 
                    field={field} 
                    onChangeField={onChangeField} 
                    onChangeOrder={onChangeOrder}
                />
                <ArticlesViewSelector 
                    view={articlesPageView} 
                    onViewClick={onViewClick}
                /> 
            </div>
            <Card className={cls.card}>
                <Input onChange={onChangeSearch} value={search} placeholder={t('Поиск...')}/>
            </Card>
        </div>
    );
}