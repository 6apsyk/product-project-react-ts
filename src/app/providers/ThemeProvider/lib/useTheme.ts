import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext'

interface useContextResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme (): useContextResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        let newTheme: Theme

        switch (theme) {
        case Theme.LIGHT:
            newTheme = Theme.DARK
            break;
        case Theme.DARK:
            newTheme = Theme.ORANGE
            break; 
        case Theme.ORANGE:
            newTheme = Theme.LIGHT
            break;       
        default:
            newTheme = Theme.LIGHT
            break;
        }

        setTheme?.(newTheme)

        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme
    }
}
