
// 1- адрес страницы, позиция скрола
export type ScrollSchema = Record<string, number>

export interface ScrollSaveSchema {
    scroll: ScrollSchema
}