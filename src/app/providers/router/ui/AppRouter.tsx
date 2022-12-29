import { Routes, Route } from 'react-router-dom'
import { memo, Suspense, useCallback} from 'react'
import { AppRoutersProps, routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'
import { RequireAuth } from './RequireAuth'

const AppRouter = () => {

    const renderWithWrapper = useCallback((route: AppRoutersProps) => {

        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        )

        return (
            <Route 
                key={route.path} 
                path={route.path} 
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element} 
            />
        )
    },[])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    )
}

export default memo(AppRouter)
