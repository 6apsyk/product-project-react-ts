import { StateSchema } from 'app/providers/StoreProvider';
import { getScrollByPath, scrollSaveActions } from 'features/scrollSave';
import { ReactNode, useRef, MutableRefObject, memo, UIEventHandler, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
 className?: string;
 children?: ReactNode;
 onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {

    const {pathname} = useLocation()

    const {
        className,
        children,
        onScrollEnd
    } = props

    const scrollCoordinate = useSelector((state: StateSchema) => getScrollByPath(state, pathname))
    const dispatch = useAppDispatch()


    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useInfinityScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaveActions.setScroll({
            path: pathname,
            position: e.currentTarget.scrollTop
        }) )
    }, 500)

    useInitialEffect(() =>
        wrapperRef.current.scrollTop = scrollCoordinate
    )

    return (
        <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])} onScroll={onScroll}>
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef}></div> : null}
        </section>
    );
})