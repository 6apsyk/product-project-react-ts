import { createSelector } from "@reduxjs/toolkit";
import { getArticleDetailsData } from "./articleDetails";
import { getUserAuthData } from "entities/User";

export const getCanEditArticle = createSelector(
    getArticleDetailsData,
    getUserAuthData,
    (article, user) => {
        console.log(article, user)
        if (!article || !user){
            return false
        }
            
        return article.user.id === user.id
       
        
    }


)