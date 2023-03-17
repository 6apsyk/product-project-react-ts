import { ReactNode, useRef, MutableRefObject, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll';
import cls from './Page.module.scss';

interface PageProps {
 className?: string;
 children?: ReactNode;
 onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd
    } = props

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useInfinityScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd
    })

    return (
        <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
            {children}
            <div ref={triggerRef}></div>
        </section>
    );
})