import classNames, { Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProfileCard.module.scss';
import { Text, TextAligh, TextTheme } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from 'features/EditableProfileCard';
import { Loader } from 'shared/ui/Loader/Loader';

interface ProfileCardProps {
 className?: string;
 data?: Profile,
 isLoading?: boolean,
 error?: string,
 readonly?: boolean,
 onChangeFirstname?: (value: string) => void,
 onChangeLastName?: (value: string) => void
 
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {t} = useTranslation('profile')

    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastName
    } = props

    if (isLoading){
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader/>
            </div>
        )
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text 
                    theme={TextTheme.ERROR} 
                    title={t('Произошла ошибка на сервере!')} 
                    text={t('Попробуйте обновить страницу')}
                    align={TextAligh.CENTER}
                />
            </div>
        )
    }

    const mods: Mods = {
        [cls.readonly] : !readonly
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <Input
                value={data?.first}
                placeholder={t('Ваше имя:')}
                className={cls.input}
                onChange={onChangeFirstname}
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия:')}
                className={cls.input}
                onChange={onChangeLastName}
            />
        </div>
    );
}