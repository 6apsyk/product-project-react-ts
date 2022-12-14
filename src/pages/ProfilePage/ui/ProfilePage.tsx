import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { 
    fetchProfileData, 
    getProfileError, 
    getProfileForm, 
    getProfileIsLoading, 
    getProfileReadonly, 
    profileActions, 
    profileReducer,
    ValidateProfileErrors 
} from 'features/EditableProfileCard';
import { getValidateErrors } from 'features/EditableProfileCard/model/selectors/getValidateErrors/getValidateErrors';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {classNames} from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>();

    const form = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getValidateErrors)

    const translateValidateErrors: Record<ValidateProfileErrors, string> = {
        [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Неккоректное имя или фамилия'),
        [ValidateProfileErrors.INCORRECT_AGE]: t('Неккоректный возраст'),
        [ValidateProfileErrors.INCORRECT_CITY]: t('Неккоректный город'),
        [ValidateProfileErrors.NO_DATA]: t('Нет данных профиля'),
        [ValidateProfileErrors.SERVER_ERROR]: t('Сервер не отвечает')
    }

    useInitialEffect(() => {
        if (id){
            dispatch(fetchProfileData(id)) 
        }    
    })

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateData({first: value}))
    }, [dispatch])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateData({lastname: value}))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateData({city: value}))
    }, [dispatch])

    const onChangeAge = useCallback((value: string) => {
        const reg = new RegExp('^[0-9]+$');
        if (reg.test(value) || value === ''){
            dispatch(profileActions.updateData({age: Number(value)}))
        }        
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateData({avatar: value}))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateData({username: value}))
    }, [dispatch])

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateData({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateData({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames('', {}, [className])}>
                <ProfilePageHeader/>
                {validateErrors?.length && validateErrors.map(err => 
                    <Text 
                        theme={TextTheme.ERROR}
                        text={translateValidateErrors[err]}
                        key={err}
                    />
                )}
                <ProfileCard 
                    data={form} 
                    isLoading={isLoading} 
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastName={onChangeLastName}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeAvatar={onChangeAvatar}
                    onChangeUsername={onChangeUsername}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </Page>
        </DynamicModuleLoader>
    )  
}
export default ProfilePage
