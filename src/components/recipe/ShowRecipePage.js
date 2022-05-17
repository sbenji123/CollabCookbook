import React from 'react'
import RecipeDetails from './RecipeDetails'
import { useParams } from 'react-router'

const ShowRecipePage = () => {
    const { id } = useParams()
    return (
        <RecipeDetails id={id}/>
    )
}

export default ShowRecipePage

