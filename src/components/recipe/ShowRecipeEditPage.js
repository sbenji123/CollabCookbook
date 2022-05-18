import React from 'react'
import EditRecipe from './EditRecipe'
import { useParams } from 'react-router'

const ShowRecipeEditPage = () => {
    const { id } = useParams()
    return (
        <EditRecipe id={id}/>
    )
}

export default ShowRecipeEditPage

