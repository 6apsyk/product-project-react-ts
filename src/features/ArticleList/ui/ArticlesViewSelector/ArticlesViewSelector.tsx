import { ArticleView } from 'entities/Article';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesViewSelector.module.scss';
import IconGrid from 'shared/assets/icons/grid.svg'
import IconList from 'shared/assets/icons/list.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';


interface ArticlesViewSelectorProps {
 className?: string;
 view?: ArticleView;
 onViewClick: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: IconGrid
    },
    {
        view: ArticleView.BIG,
        icon: IconList
    },
]

export const ArticlesViewSelector = memo((props: ArticlesViewSelectorProps) => {
    const {
        className,
        view,
        onViewClick
    } = props

    const onClick = (view: ArticleView) => {
        return () => onViewClick(view)
    }

    return (
        <div className={classNames(cls.ArticlesViewSelector, {}, [className])}>
            {viewTypes.map(type => (
                <Button theme={ButtonTheme.CLEAR} key={type.view} onClick={onClick(type.view)}>
                    <Icon 
                        Svg={type.icon} 
                        className={classNames('',{ [cls.notSelected]: type.view !== view}, [])}
                    />
                </Button>
            ))}
        </div>
    );
})