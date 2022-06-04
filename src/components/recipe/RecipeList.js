import React from 'react';
import RecipeRow from './RecipeRow'
import { Link } from 'react-router-dom';

const RecipeList = ({recipeList}) => {
    return (
        <div className="recipe-list container col">
            <Link to={'/recipes/create'} >
                <button className="right btn-floating btn-large waves-effect waves-light red">
                    AddR
                </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <td>Recipe</td>
                  <td>Attribution</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                { recipeList && Object.keys(recipeList).map(recipeKey => {
                  return (
                    <RecipeRow targetRecipe={recipeList[recipeKey]} id={isNaN(parseInt(recipeKey)) ? recipeKey : recipeList[recipeKey].id} key={recipeKey}/>
                  )
                })}
              </tbody>
            </table>
        </div>
    )
}


export default RecipeList;