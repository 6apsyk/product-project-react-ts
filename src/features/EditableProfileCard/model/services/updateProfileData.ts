import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/provider/StoreProvider"
import { getProfileForm } from "../selectors/getProfileForm/getProfileForm"
import { Profile } from "../types/profile"

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>
(
    'profile/updateProfileData',
    async (_, thunkAPI) => {

        const {extra, rejectWithValue, getState} = thunkAPI

        const form = getProfileForm(getState())

        try {
            
            const response = await extra.api.put<Profile>('/profile', form)

            return response.data
        } catch (error) {
            return rejectWithValue('error')
        }        
    }
)