import { CSSProperties, memo, useMemo } from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
 className?: string;
 src?: string
 size?: number;
 alt?: string   
}

export const Avatar = memo((props: AvatarProps) => {

    const {
        className,
        alt,
        size,
        src
    } = props

    const styles = useMemo<CSSProperties>(() => {
        return {
            height: size,
            width: size
        }
    }, [size])

    return (
        <img 
            className={classNames(cls.Avatar, {}, [className])}
            src={src} 
            alt={alt}
            style={styles} 
        />
    );
})