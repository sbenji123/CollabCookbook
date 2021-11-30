import React from 'react'
import { useParams } from 'react-router';
import IngrediantList from './IngrediantList'
import DirectionList from './DirectionList';
import { Link } from 'react-router-dom'

const RecipeDetails = ({recipe}) => {
    const { id } = useParams(); // for URL after /recipe/:id
    return (
        <div className="container white recipe-details">
            <div className="row">
                {displayRecipeImage(recipe.image)}
                <div className="col s12 m6">
                    <span>{recipe.title}</span>
                    {quantitativeRecipeDetails(recipe)}
                    <Link to={'/recipe/'+id+'/edit'} >
                        <button class="right btn-floating btn-large waves-effect waves-light red">
                            <i class="material-icons">edit</i>
                        </button>
                    </Link>
                </div>
            </div>
                <IngrediantList ingrediants={recipe.ingrediants} />
                <DirectionList directions={recipe.directions} />
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
            <div className="col s12 m6">
                <img src={image} alt="" />
            </div>
        )
    } else{
        return (null)
    }
}

export default RecipeDetails
