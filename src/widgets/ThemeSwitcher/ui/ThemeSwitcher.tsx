import { Theme, useTheme } from 'app/provider/ThemeProvider'
import {classNames} from 'shared/lib/classNames/classNames'
import LightIcon from 'shared/assets/icons/theme-light.svg'
import DarkIcon from 'shared/assets/icons/theme-dark.svg'
import OrangeIcon from 'shared/assets/icons/theme-orange.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { memo } from 'react'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()

    const getIcon = (theme: Theme) => {
        switch (theme) {
        case Theme.DARK:
            return <DarkIcon/>
        case Theme.LIGHT:
            return <LightIcon/>
        case Theme.ORANGE:
            return <OrangeIcon/>        
        default:
            return <LightIcon/>
        }
    }

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {getIcon(theme)}
        </Button>
    )
})
