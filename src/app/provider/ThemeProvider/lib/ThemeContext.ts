import { createContext } from 'react'

export const enum Theme {
  LIGTH = 'ligth',
  DARK = 'dark',
}

interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
