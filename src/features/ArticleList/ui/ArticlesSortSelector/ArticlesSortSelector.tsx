import { ArticleSortField } from 'entities/Article';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {classNames} from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import cls from './ArticlesSortSelector.module.scss';

interface ArticlesSortSelectorProps {
 className?: string;
 order: SortOrder;
 field: ArticleSortField;
 onChangeOrder: (newOrder: SortOrder) => void;
 onChangeField: (newField: ArticleSortField) => void 
}

export const ArticlesSortSelector = ({ className, order, field, onChangeField, onChangeOrder }: ArticlesSortSelectorProps) => {

    const sortField = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: 'дате создания'
        },
        {
            value: ArticleSortField.TITLE,
            content: 'названию'
        },
        {
            value: ArticleSortField.VIEWS,
            content: 'просмотрам'
        },
    ],[])

    const sortOrder = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: 'возрастанию'
        },
        {
            value: 'desc',
            content: 'убыванию'
        }
    ],[])

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticlesSortSelector, {}, [className])}>
            <Select<ArticleSortField> 
                onChange={onChangeField}  
                value={field} 
                options={sortField} 
                label={t('Сортировать по') }
            />
            <Select<SortOrder> 
                onChange={onChangeOrder}  
                value={order} 
                options={sortOrder} 
                label={t('по') }
            />
        </div>
    );
}