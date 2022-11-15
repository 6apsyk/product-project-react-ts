import { memo } from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

export enum TextAligh {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

interface TextProps {
 className?: string
 title?: string
 text?: string
 theme?: TextTheme,
 align?: TextAligh
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAligh.LEFT
    } = props

    return (
        <div className={classNames(cls.Text, {}, [className, cls[align], cls[theme]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
})