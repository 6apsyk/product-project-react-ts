import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"
import { Profile, ValidateProfileErrors } from "../../types/profile"
import { validateProfileData } from "../validateProfileData/validateProfileData"

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileErrors[]>>
(
    'profile/updateProfileData',
    async (_, thunkAPI) => {

        const {extra, rejectWithValue, getState} = thunkAPI

        const form = getProfileForm(getState())

        const errors = validateProfileData(form)

        if (errors.length) {
            return rejectWithValue(errors)
        }

        try {
            
            const response = await extra.api.put<Profile>('/profile', form)

            if (!response.data) {
                throw new Error();
            }

            return response.data
        } catch (error) {
            return rejectWithValue([ValidateProfileErrors.SERVER_ERROR])
        }        
    }
)