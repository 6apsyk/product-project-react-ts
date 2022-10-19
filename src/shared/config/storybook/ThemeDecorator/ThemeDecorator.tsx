import { Story } from "@storybook/react";
import { Theme, ThemeProvider } from "app/provider/ThemeProvider";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (  
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent/>
        </div>
    </ThemeProvider>  
)