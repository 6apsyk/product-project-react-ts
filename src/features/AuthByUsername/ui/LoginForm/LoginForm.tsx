import { useTranslation } from 'react-i18next';
import classNames from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
 className?: string;
}

export const LoginForm = (props: LoginFormProps) => {

    const {t} = useTranslation()

    const {
        className
    } = props
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input placeholder={t('Введите логин')} autofocus type="text" className={cls.input}/>
            <Input placeholder={t('Введите пароль')} type="text" className={cls.input}/>
            <Button theme={ButtonTheme.OUTLINE} className={cls.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    );
}