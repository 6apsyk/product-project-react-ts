// import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername/model/types/loginSchema";
export interface StateSchema {
    // counter: CounterSchema,
    user: UserSchema,
    loginForm: LoginSchema
}