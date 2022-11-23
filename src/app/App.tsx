import {classNames} from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/provider/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar/ui'
import { FC, Suspense, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'entities/User'
import { getUserAuthDataInited } from 'entities/User'

const App = () => {

    const _inited = useSelector(getUserAuthDataInited)

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
                    {_inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
}

export default App
