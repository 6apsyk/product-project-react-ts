import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticlesPage.module.scss';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { Article, ArticleView } from 'entities/Article';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList articles={[]} view={ArticleView.SMALL} isLoading={true}/>
        </div>
    );
};

export default memo(ArticlesPage);
