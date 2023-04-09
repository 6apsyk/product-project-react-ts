import {classNames} from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPageHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { memo, useCallback } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from 'entities/Article';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { getUserAuthData } from 'entities/User';

interface ArticleDetailsPageHeaderProps {
 className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {

    const { t } = useTranslation('article-details');
    const navigate = useNavigate()

    const canEdit = useSelector(getCanEditArticle)

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && <Button
                className={cls.editBtn} 
                theme={ButtonTheme.OUTLINE} 
                onClick={onBackToList}
            >
                {t('Редактировать')}
            </Button>}
        </div>
    );
})