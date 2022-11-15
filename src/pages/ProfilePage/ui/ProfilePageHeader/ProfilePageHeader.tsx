import { useCallback } from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProfilePageHeader.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'features/EditableProfileCard';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface ProfilePageHeaderProps {
 className?: string;
//  children?: ReactNode;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const {t} = useTranslation('profile')

    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch()

    const {
        className,
    } = props

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>       
            <Text title={t('Профиль')}/>
            {readonly ? 
                <Button 
                    theme={ButtonTheme.OUTLINE} 
                    className={cls.editBtn}
                    onClick={onEdit}
                >
                    {t('Редактировать')}
                </Button>
                : 
                <>
                    <Button 
                        theme={ButtonTheme.OUTLINE_RED} 
                        className={cls.editBtn}
                        onClick={onCancel}
                    >
                        {t('Отменить')}
                    </Button>
                    <Button 
                        theme={ButtonTheme.OUTLINE} 
                        className={cls.saveBtn}
                        onClick={onSave}
                    >
                        {t('Сохранить')}
                    </Button>
                </>
                
            }
        </div>
    );
}