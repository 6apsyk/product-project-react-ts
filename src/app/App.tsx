import {classNames} from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/provider/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar/ui'
import { FC, Suspense, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from 'entities/User'

const App: FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames('app', {}, [])}>
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
