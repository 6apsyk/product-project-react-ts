import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
 className?: string;
 articles: Article[];
 view?: ArticleView;
 isLoading?: boolean;
}

const getSkeleton = (view: ArticleView) => {
    return (
        new Array(view === ArticleView.BIG ? 3 : 9)
            .fill(0)
            .map((item, index) => <ArticleListItemSkeleton key={index} view={view} className={cls.card}/>) 
    )
} 

export const ArticleList = memo((props: ArticleListProps) => {
    const {t} = useTranslation()
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL
    } = props

    const renderList = (article: Article) => {
        return (
            <ArticleListItem
                key={article.id} 
                article={article} 
                view={view}
                className={cls.card}
            />
        ) 
    }

    if (isLoading) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                {getSkeleton(view)}
            </div>
        ) 
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0 
                ? articles.map(renderList)
                : null
            }
        </div>
    );
})