import React from 'react'
import { useParams } from 'react-router';
import IngrediantList from './IngrediantList'
import DirectionList from './DirectionList';

const RecipeDetails = ({recipe}) => {
    console.log(recipe)
    const { id } = useParams(); // for URL after /recipe/:id
    return (
        <div className="div container section recipe-details">
            <div className="card horizontal">
                {displayRecipeImage(recipe.image)}
                <div className="card-stacked">
                    <div className="card-content">
                        <span className="card-title">{recipe.title} - {id}</span>
                        {quantitativeRecipeDetails(recipe)}
                    </div>
                </div>
            </div>
            <div className="card">
                <IngrediantList ingrediants={recipe.ingrediants} />
                <DirectionList directions={recipe.directions} />
                <a class="btn-floating halfway-fab waves-effect waves-light red">
                    <i class="material-icons">edit</i>
                </a>
            </div>
        </div>
    )
}

const quantitativeRecipeDetails = (recipe) => {
    return (
        <table className="striped">
            <thead>
                <tr>
                    <th>Prep Time</th>
                    <th>Total Time</th>
                    <th>Serving Size</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{recipe.prepTime}</td>
                    <td>{recipe.totalTime}</td>
                    <td>{recipe.servingSize}</td>
                </tr>
            </tbody>
        </table>
    )
}

const displayRecipeImage = (image) => {
    if (image){
        return (
            <div className="card-image">
                <img src={image} alt="" />
            </div>
        )
    } else{
        return (null)
    }
}

export default RecipeDetails
