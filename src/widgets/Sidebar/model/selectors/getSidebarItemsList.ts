import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItemsList = createSelector((state: StateSchema) => state.user.authData, authData => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            Icon: MainIcon,
            text: 'Главная',
        },
        {
            path: RoutePath.about,
            Icon: AboutIcon,
            text: 'О сайте',
        }
    ];

    if (authData) {
        sidebarItemsList.push(
            {
                path: RoutePath.profile + authData?.id,
                Icon: ProfileIcon,
                text: 'Профиль',
                authOnly: true
            },
            {
                path: RoutePath.articles,
                Icon: ArticleIcon,
                text: 'Статьи',
                authOnly: true,
            }
        )
    }

    return sidebarItemsList
})


    