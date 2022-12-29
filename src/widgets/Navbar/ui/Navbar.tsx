/* eslint-disable i18next/no-literal-string */
import { getUserAuthData, userActions } from 'entities/User'
import { LoginModal } from 'features/AuthByUsername'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {classNames} from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {

    const [isAuthModal, setIsAuthModal] = useState(false)

    const authData = useSelector(getUserAuthData)
    const dispatch = useDispatch()

    const {t} = useTranslation()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(prev => !prev)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(prev => !prev)
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button 
                    className={cls.links} 
                    theme={ButtonTheme.OUTLINE_INVERTED} 
                    onClick={onLogout}
                >
                    {t('Выйти')}
                </Button>
            </div>
        )
    }
    
    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button 
                className={cls.links} 
                theme={ButtonTheme.OUTLINE_INVERTED} 
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && 
                <LoginModal 
                    isOpen={isAuthModal} 
                    onClose={onCloseModal}
                />}
        </header>
    )
})
