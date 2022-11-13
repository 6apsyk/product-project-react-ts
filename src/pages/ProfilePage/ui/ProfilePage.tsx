import { ProfileCard } from 'entities/Profile';
import { fetchProfileData, 
    getProfileData, 
    getProfileError, 
    getProfileIsLoading, 
    getProfileReadonly, 
    profileActions, 
    profileReducer 
} from 'features/EditableProfileCard';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const data = useSelector(getProfileData)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateData({first: value}))
    }, [dispatch])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateData({lastname: value}))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader/>
                <ProfileCard 
                    data={data} 
                    isLoading={isLoading} 
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastName={onChangeLastName}
                />
            </div>
        </DynamicModuleLoader>
    )  
}
export default ProfilePage
