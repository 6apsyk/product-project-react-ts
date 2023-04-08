import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red'
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
  children?: ReactNode
  target?: HTMLAttributeAnchorTarget
}

export const AppLink = memo((props: AppLinkProps) => {
    const { className, children, to, theme = AppLinkTheme.PRIMARY, target, ...otherProps } = props

    return (
        <Link target={target} to={to} className={classNames(cls.AppLink, {}, [className, cls[theme]])} {...otherProps}>
            {children}
        </Link>
    )
})
