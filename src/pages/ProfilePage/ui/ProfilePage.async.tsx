import { lazy } from 'react'

export const ProfilePageAsync = lazy(
    async () =>
        await new Promise((resolve) => {
            // @ts-expect-error
            setTimeout(() => resolve(import('./ProfilePage')), 1500)
        })
)
