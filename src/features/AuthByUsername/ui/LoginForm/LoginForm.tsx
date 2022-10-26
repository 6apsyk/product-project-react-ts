import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';
import { loginActions } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsename/loginByUsename';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
 className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {

    const {t} = useTranslation()

    const dispatch = useDispatch()

    const {username, password, isLoading, error} = useSelector(getLoginState)

    const {
        className
    } = props

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({password,username}))
    }, [dispatch, password, username])

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')}/>
            {error && <Text theme={TextTheme.ERROR} text={t('Вы ввели не правильный логин или пароль')}/>}
            <Input 
                placeholder={t('Введите логин')} 
                autofocus 
                type="text" 
                className={cls.input}
                onChange={onChangeUsername}
                value={username}
            />
            <Input 
                placeholder={t('Введите пароль')} 
                type="text" 
                className={cls.input}
                onChange={onChangePassword}
                value={password}
            />
            <Button 
                theme={ButtonTheme.OUTLINE} 
                className={cls.loginBtn} 
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
})