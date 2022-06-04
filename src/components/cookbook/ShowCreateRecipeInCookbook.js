import React from 'react'
import CreateRecipe from '../recipe/CreateRecipe'
import { useParams } from 'react-router'

const ShowCreateRecipeInCookbook = () => {
  console.log(useParams())
    const { id } = useParams()
    return (
        <CreateRecipe cookbookId={id}/>
    )
}

export default ShowCreateRecipeInCookbook

