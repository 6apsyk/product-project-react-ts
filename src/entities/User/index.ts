import { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData";
import { getUserAuthDataInited } from "./model/selectors/getUserAuthDataInited/getUserAuthDataInited";
import { userActions, userReducer } from "./model/slice/userSlice";
import { User, UserSchema } from './model/types/user'



export {
    userActions,
    userReducer,
    User, 
    UserSchema,
    getUserAuthData,
    getUserAuthDataInited
}