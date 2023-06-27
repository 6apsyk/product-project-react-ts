import { memo, useMemo, useState } from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import cls from './Sidebar.module.scss'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getSidebarItemsList } from 'widgets/Sidebar/model/selectors/getSidebarItemsList'
import { VStack } from 'shared/ui/Stack/VStack/VStack'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {

    const [collapsed, setCollapsed] = useState(false)
    const sidebarItemsList = useSelector(getSidebarItemsList)

    const   onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const itemList = useMemo(() => sidebarItemsList.map(item => 
        <SidebarItem key={item.path} item={item} collapsed={collapsed}/>
    ), [collapsed, sidebarItemsList]) 

    return (
        <aside data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
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
            <VStack role="navigation" gap='16' className={cls.items}>
                {itemList}           
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    )
})
