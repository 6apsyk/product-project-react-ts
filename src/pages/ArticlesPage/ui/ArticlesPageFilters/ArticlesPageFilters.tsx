import {classNames} from 'shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { articlesPageAction, 
    ArticlesViewSelector, 
    fetchArticleList, 
    getArticlePageField, 
    getArticlePageOrder, 
    getArticlePageSearch, 
    getArticlePageView,
    getArticlePageType 
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
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { ITabsItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';

const typeTabs: ITabsItem[] = [
    {
        value: ArticleType.ALL,
        content: 'Все'
    },
    {
        value: ArticleType.SCIENCE,
        content: 'Наука'
    },
    {
        value: ArticleType.ECONOMICS,
        content: 'Экономика'
    },
    {
        value: ArticleType.IT,
        content: 'Айти'
    }
]

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
    const type = useSelector(getArticlePageType)

    const onViewClick = (view: ArticleView) => {
        dispatch(articlesPageAction.setView(view))
    }

    const fetchData = useCallback(() => {
        dispatch(fetchArticleList({replace: true}))
    },[dispatch])

    const debounceFetchData = useDebounce(fetchData, 500)

    const onChangeField = useCallback((newField: ArticleSortField) => {
        dispatch(articlesPageAction.setField(newField))
        dispatch(articlesPageAction.setPage(1))
        fetchData()
    },[dispatch, fetchData])

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageAction.setOrder(newOrder))
        dispatch(articlesPageAction.setPage(1))
        fetchData()
    },[dispatch, fetchData])

    const onChangeSearch = useCallback((newSearch: string) => {
        dispatch(articlesPageAction.setSearch(newSearch))
        dispatch(articlesPageAction.setPage(1))
        debounceFetchData()
    },[dispatch, debounceFetchData])

    const onChangeType = useCallback((newType: ITabsItem) => {
        dispatch(articlesPageAction.setType(newType.value as ArticleType))
        dispatch(articlesPageAction.setPage(1))
        debounceFetchData()
    },[dispatch, debounceFetchData])

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
            <Tabs
                tabs={typeTabs}
                value={type}
                onClickTabs={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
}