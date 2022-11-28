import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

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

