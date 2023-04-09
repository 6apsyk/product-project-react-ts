import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from 'features/ArticleCommentList/model/slice/articleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from 'features/ArticleCommentList/model/selectors/comments';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { fetchCommentsByArticleId } from 'features/ArticleCommentList';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { addCommentForArticle, AddCommentForm } from 'features/addCommentForm';
import { Page } from 'shared/ui/Page/Page';
import { 
    articleDetailsRecommendationsReducer,
    getArticleRecommendations 
} from 'features/ArticleRecommendationList/model/slice/articleDetailsRecommendationsSlice';
import { getArticleRecommendationsIsLoading } from 'features/ArticleRecommendationList/model/selectors/recommendations';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { fetchRecommendations } from 'features/ArticleRecommendationList';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsRecommendationsReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll)
    const recommendations = useSelector(getArticleRecommendations.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)
    const dispatch = useAppDispatch()

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchRecommendations())
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetailsPageHeader/>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('Рекомендации')}/>
                <ArticleList 
                    className={cls.recommendations} 
                    articles={recommendations} 
                    isLoading={recommendationsIsLoading}
                    target='_blank'
                />
                <Text className={cls.commentTitle} title={t('Комментарии')}/>
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList 
                    comments={comments.reverse()}
                    isLoading={commentsIsLoading}
                />
            </Page>
        </DynamicModuleLoader>
        
    );
};

export default memo(ArticleDetailsPage);

