/* eslint-disable i18next/no-literal-string */
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'
// import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {

    const [isAuthModal, setIsAuthModal] = useState(false)

    const {t} = useTranslation()

    const onToggleModal = useCallback(() => {
        setIsAuthModal(prev => !prev)
    }, [])

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button className={cls.links} theme={ButtonTheme.OUTLINE_INVERTED} onClick={onToggleModal}>
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem cum veritatis maxime amet
                officiis 
                rerum corrupti tenetur, iste quaerat alias cupiditate ab dolore magni beatae, ex magnam accusantium 
                laudantium sequi.
            </Modal>
        </div>
    )
}
