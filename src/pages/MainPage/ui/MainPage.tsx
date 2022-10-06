import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const MainPage: FC = () => {
    const { t } = useTranslation('main')

    return <div>{t('Главная страница')}</div>
}

export default MainPage
