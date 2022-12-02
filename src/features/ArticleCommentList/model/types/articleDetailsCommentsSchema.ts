import { EntityState } from "@reduxjs/toolkit"
import { Comment } from "entities/Comment"

export interface articleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean
    error?: string
}