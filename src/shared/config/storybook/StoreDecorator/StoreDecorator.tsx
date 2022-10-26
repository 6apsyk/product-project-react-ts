import { DeepPartial } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StoreProvider } from "app/provider/StoreProvider";
import { StateSchema } from "app/provider/StoreProvider/config/StateSchema";

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (  
    <StoreProvider initialState={state}>
        <StoryComponent/>
    </StoreProvider>  
)