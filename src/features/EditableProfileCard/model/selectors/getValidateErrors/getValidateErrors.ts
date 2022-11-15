import { StateSchema } from "app/provider/StoreProvider";

export const getValidateErrors = (state: StateSchema) => state.profile?.validateErrors 