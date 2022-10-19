import { createContext } from 'react'

export const enum Theme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme',
}

interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
