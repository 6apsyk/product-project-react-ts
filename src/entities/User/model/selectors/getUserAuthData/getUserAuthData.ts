import { StateSchema } from "app/providers/StoreProvider";

export const getUserAuthState = (state: StateSchema) => state.user.authData