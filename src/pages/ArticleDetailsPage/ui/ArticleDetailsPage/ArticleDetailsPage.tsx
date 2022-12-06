import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
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

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useAppDispatch()

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    });

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('Комментарии')}/>
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList 
                    comments={comments}
                    isLoading={commentsIsLoading}
                />
            </div>
        </DynamicModuleLoader>
        
    );
};

export default memo(ArticleDetailsPage);

