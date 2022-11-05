import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface LangSwitcherProps {
  className?: string,
  short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <div>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={classNames('', {}, [className])}
                onClick={toggle}
            >
                {t(short ? 'Короткий язык' : 'Язык')}
            </Button>
        </div>
    )
})
