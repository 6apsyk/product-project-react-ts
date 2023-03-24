import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScrollSaveSchema } from '../types/scrollSave'

const initialState: ScrollSaveSchema  = {
    scroll: {}
}

export const scrollSaveSlice = createSlice({
    name: 'scrollSave',
    initialState: initialState,
    reducers: {
        setScroll: (state, actions: PayloadAction<{path: string, position: number}>) => {
            state.scroll[actions.payload.path] = actions.payload.position
        }
    }
})

// Action creators are generated for each case reducer function
export const { actions: scrollSaveActions } = scrollSaveSlice
export const { reducer: scrollSaveReducer } = scrollSaveSlice
