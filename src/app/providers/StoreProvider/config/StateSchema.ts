// import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import {AnyAction, EnhancedStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { LoginSchema } from 'features/AuthByUsername';
import { AxiosInstance } from 'axios';
import { ProfileSchema } from 'features/EditableProfileCard';
import { ArticleDetailsSchema } from 'entities/Article';
import { articleDetailsCommentsSchema } from 'features/ArticleCommentList';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { articlesPageSchema } from 'features/ArticleList';
import { ScrollSaveSchema } from 'features/scrollSave';
import { articleDetailsRecommendationsSchema } from 'features/ArticleRecommendationList';

export interface StateSchema {
    user: UserSchema;
    scrollSave: ScrollSaveSchema; 
    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: articleDetailsCommentsSchema;
    articleDetailsRecommendations?: articleDetailsRecommendationsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: articlesPageSchema;

}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    // navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg 
    state: StateSchema
}


