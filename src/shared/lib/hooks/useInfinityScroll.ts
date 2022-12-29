import { MutableRefObject, useEffect } from "react"

export interface UseInfinityScrollProps {
    callback?: () => void;
    wrapperRef: MutableRefObject<HTMLElement>;
    triggerRef: MutableRefObject<HTMLElement>;
} 

export const useInfinityScroll = (props: UseInfinityScrollProps) => {
    const {triggerRef, wrapperRef, callback} = props

    useEffect(() => {

        let observer: IntersectionObserver | null = null

        if (callback){
            const options = {
                root: wrapperRef.current,
                rootMargin: '0px',
                threshold: 1.0
            }
            
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    console.log('useInfinityScroll')
                    callback();
                }
            }, options);

            observer.observe(triggerRef.current);
        }

        return () => {
            if (observer && triggerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef.current);
            }
        }
    }, [callback, triggerRef, wrapperRef])

    
}