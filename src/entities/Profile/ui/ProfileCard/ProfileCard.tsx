import { Mods, classNames} from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProfileCard.module.scss';
import { Text, TextAligh, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from 'features/EditableProfileCard';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';

interface ProfileCardProps {
    className?: string;
    data?: Profile,
    isLoading?: boolean,
    error?: string,
    readonly?: boolean,
    onChangeFirstname?: (value: string) => void,
    onChangeLastName?: (value: string) => void,
    onChangeCity?: (value: string) => void,
    onChangeAge?: (value: string) => void,
    onChangeAvatar?: (value: string) => void,
    onChangeUsername?: (value: string) => void,
    onChangeCurrency?: (currency: Currency) => void,
    onChangeCountry?: (country: Country) => void
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
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency
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
            <div className={cls.avatarWrapper}>
                {data?.avatar && <Avatar src={data?.avatar} alt={t('аватар')}/>}
            </div>
            
            <Input
                value={data?.first}
                placeholder={t('Ваше имя:')}
                className={cls.input}
                onChange={onChangeFirstname}
                readonly={readonly}
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия:')}
                className={cls.input}
                onChange={onChangeLastName}
                readonly={readonly}
            />
            <Input
                value={data?.age}
                placeholder={t('Ваш возраст:')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
                pattern="[0-9\/]*"
            />
            <Input
                value={data?.city}
                placeholder={t('Ваш город:')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t('Имя пользователя:')}
                className={cls.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Ваш аватар:')}
                className={cls.input}
                onChange={onChangeAvatar}
                readonly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </div>
    );
}