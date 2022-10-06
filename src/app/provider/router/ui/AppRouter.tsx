import { Routes, Route } from 'react-router-dom'
import { FC, Suspense } from 'react'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'

const AppRouter: FC = () => {
  return (
      <Suspense fallback={<PageLoader />}>
          <Routes>
              {Object.values(routeConfig).map(({ path, element }) => (
                  <Route key={path} path={path} element={<div className="page-wrapper">{element}</div>} />
              ))}
          </Routes>
      </Suspense>
  )
}

export default AppRouter
