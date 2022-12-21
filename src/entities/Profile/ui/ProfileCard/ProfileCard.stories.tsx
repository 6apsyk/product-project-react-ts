import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/storybook.jpg'

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        avatar: avatar,
        age: 33,
        city: 'sddfsfd',
        country: Country.Armenia,
        currency: Currency.EUR,
        first: 'dfsdfds',
        lastname: 'dfsdfs',
        username: 'dfsdfds'
    }
};

export const withError = Template.bind({});
withError.args = {
    error: 'error'
};

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true
};
