import { memo, useCallback } from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface ITabsItem {
    value: string
    content: string
}

interface TabsProps {
 className?: string;
 value: string;
 tabs: ITabsItem[];
 onClickTabs: (tab: ITabsItem) => void;
}



export const Tabs = memo(({ className, tabs, value, onClickTabs }: TabsProps) => {

    const onClickHandle = useCallback((tab: ITabsItem) => {
        return () => {
            onClickTabs(tab) 
        }
    }, [onClickTabs])

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map(tab => (
                <Card 

                    className={cls.tab} 
                    key={tab.value} 
                    theme={value === tab.value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                    onClick={onClickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
})