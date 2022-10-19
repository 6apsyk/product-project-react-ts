import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/provider/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button, ButtonSize, ButtonTheme } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};
Primary.decorators = [ThemeDecorator(Theme.LIGTH)]

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
Clear.decorators = [ThemeDecorator(Theme.LIGTH)]

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
};

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE_INVERTED,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Background = Template.bind({});
Background.args = {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND_INVERTED,
};



export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    size: ButtonSize.M,
    square: true
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
    children: '<',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    size: ButtonSize.L,
    square: true
};
SquareSizeL.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeXL = Template.bind({});
SizeXL.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    size: ButtonSize.XL,
    square: true
};

export const OutlineSizeM = Template.bind({});
OutlineSizeM.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.M

};
export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L
    
};
export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL
    
};