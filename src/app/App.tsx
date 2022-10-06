import './styles/index.scss'
import classNames from 'shared/lib/classNames/classNames'
import { useTheme } from 'app/provider/ThemeProvider'
import { AppRouter } from 'app/provider/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar/ui'
import { FC, Suspense } from 'react'

const App: FC = () => {
    const { theme } = useTheme()

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
