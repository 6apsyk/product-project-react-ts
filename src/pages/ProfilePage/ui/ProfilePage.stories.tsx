import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
// import avatar from 'shared/assets/tests/storybook.jpg'

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    profile: {
        form : {
            // avatar: avatar,
            age: 33,
            city: 'sddfsfd',
            country: Country.Armenia,
            currency: Currency.EUR,
            first: 'dfsdfds',
            lastname: 'dfsdfs',
            username: 'dfsdfds'
        }
    }
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form : {
            // avatar: avatar,
            age: 33,
            city: 'sddfsfd',
            country: Country.Armenia,
            currency: Currency.EUR,
            first: 'dfsdfds',
            lastname: 'dfsdfs',
            username: 'dfsdfds'
        }
    }
})];
