import { DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

type IAlign = 'start' | 'center' | 'end'
type IJustify = 'start' | 'center' | 'end' | 'between'
type IDirection = 'row' | 'column'
type IGap = '2' | '4' | '8' | '16' | '32'


const alignClasses: Record<IAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd
}
const justifyClasses: Record<IJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.between,
}
const directionClasses: Record<IDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn
}
const gapClasses: Record<IGap, string> = {
    2: cls.gap2,
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32:  cls.gap32,
}

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
 className?: string;
 children: ReactNode;
 align?: IAlign;
 justify?: IJustify;
 direction: IDirection;
 gap?: IGap;
 max?: boolean;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        align = 'start',
        justify = 'center',
        direction = 'row',
        gap, 
        max
    } = props

    const classes = [
        className,
        alignClasses[align],
        justifyClasses[justify],
        directionClasses[direction],
        gap && gapClasses[gap]
    ]

    const mods: Mods = {
        [cls.max]: max,
    };

    return (
        <div className={classNames(cls.Flex, mods, classes)}>
            {children}
        </div>
    );
}