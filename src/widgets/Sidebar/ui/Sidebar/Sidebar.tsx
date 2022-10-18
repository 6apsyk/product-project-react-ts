import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import classNames from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import MainIcon from 'shared/assets/icons/main.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {

    const {t} = useTranslation()

    const [collapsed, setCollapsed] = useState(false)

    const   onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <div data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <Button 
                data-testid='sidebar-toggle' 
                onClick={onToggle} 
                className={cls.collapseBtn} 
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                    
                <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.main} className={cls.item}>
                    <MainIcon className={cls.icon}/>
                    <span  className={cls.link}>
                        {t('Главная')}
                    </span>
                        
                </AppLink>
        
                <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.about} className={cls.item}>
                    <AboutIcon className={cls.icon}/>
                    <span className={cls.link}>
                        {t('О себе')}
                    </span>
                        
                </AppLink>
                   
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    )
}
