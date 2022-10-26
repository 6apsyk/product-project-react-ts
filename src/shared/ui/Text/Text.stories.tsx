import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/provider/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: 'dfsdf',
    placeholder: 'dfdsfs' 
};
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Secondary = Template.bind({});
Secondary.args = {
    value: 'dfsdf',
    placeholder: 'dfdsfs' 
};
Secondary.decorators = [ThemeDecorator(Theme.DARK)]

