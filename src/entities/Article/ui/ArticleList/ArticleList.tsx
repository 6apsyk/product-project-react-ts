import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
 className?: string;
 articles: Article[];
 view?: ArticleView;
 isLoading?: boolean;
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
                article={article} 
                view={view}
                className={cls.card}
            />
        ) 
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className])}>
            {articles.length > 0 
                ? articles.map(renderList)
                : null
            }
        </div>
    );
})