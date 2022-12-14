import { useCallback, useMemo, useState } from "react"

export interface UseHoverBind {
        onMouseEnter: () => void;
        onMouseLeave: () => void;    
}

type UseHoverResult = [boolean, UseHoverBind]

export const useHover: () => UseHoverResult = () => {

    const [isHover, setIsHover] = useState(false)

    const onMouseEnter = useCallback(() => {
        console.log('зашла')
        setIsHover(true)
    }, [])

    const onMouseLeave = useCallback(() => {
        console.log('вышла')
        setIsHover(false)
    }, [])

    return  useMemo(() => [
        isHover,
        {
            onMouseEnter, 
            onMouseLeave
        } 
    ], [isHover, onMouseEnter, onMouseLeave])
}