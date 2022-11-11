import cls from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/items';
import { useTranslation } from 'react-i18next';
import classNames from 'shared/lib/classNames/classNames';
import { memo } from 'react';

interface SidebarItemProps {
 item: SidebarItemType
 collapsed: boolean 
}

export const SidebarItem = memo(({collapsed, item}: SidebarItemProps) => {
    
    const {t} = useTranslation()

    return (
        <AppLink 
            theme={AppLinkTheme.SECONDARY} 
            to={item.path} 
            className={classNames(cls.item, {[cls.collapsed]: collapsed}, [])}
        >
            <item.Icon className={cls.icon}/>
            <span  className={cls.link}>
                {t(item.text)}
            </span>
                            
        </AppLink>
        
    )
})