import { Routes, Route } from 'react-router-dom'
import { FC, memo, Suspense, useMemo } from 'react'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'
import { useSelector } from 'react-redux'
import { getUserAuthState } from 'entities/User'

const AppRouter: FC = () => {

    const isAuth = useSelector(getUserAuthState)

    const routes = useMemo(() => {
        return Object.values(routeConfig).filter(route => {
            if (route.authOnly && !isAuth) {
                return false;
            }
    
            return true;
        })
    }, [isAuth])

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routes.map(({ path, element }) => (
                    <Route key={path} path={path} element={<div className="page-wrapper">{element}</div>} />
                ))}
            </Routes>
        </Suspense>
    )
}

export default memo(AppRouter)
