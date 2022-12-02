import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './CommentList.module.scss';
import { Comment } from 'entities/Comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from 'shared/ui/Text/Text';

interface CommentListProps {
 className?: string;
 comments?: Comment[];
 isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const {t} = useTranslation()
    const { className, comments, isLoading } = props
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            { comments?.length 
                ? 
                comments?.map(comment => (
                    <CommentCard 
                        isLoading={isLoading} 
                        className={cls.comment} 
                        key={comment.id} 
                        comment={comment}
                    />
                ))
                : 
                <Text text={t('Комментарии отсутствуют')}/>
            }
        </div>
    );
})