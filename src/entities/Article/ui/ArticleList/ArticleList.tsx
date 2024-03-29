import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
 className?: string;
 articles: Article[];
 view?: ArticleView;
 isLoading?: boolean;
 target?: HTMLAttributeAnchorTarget;
}

const getSkeleton = (view: ArticleView) => {
    return (
        new Array(view === ArticleView.BIG ? 3 : 9)
            .fill(0)
            .map((item, index) => <ArticleListItemSkeleton key={index} view={view} className={cls.card}/>) 
    )
} 

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target
    } = props

    const renderList = (article: Article) => {
        return (
            <ArticleListItem
                key={article.id} 
                article={article} 
                view={view}
                className={cls.card}
                target={target}
            />
        ) 
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [cls[view], className])}>
            {articles.length > 0 
                ? articles.map(renderList)
                : null
            }
            {isLoading && getSkeleton(view)}
        </div>
    );
})