import React from 'react';
import RecipeRow from './RecipeRow'
import { Link } from 'react-router-dom';

const RecipeList = ({recipeList}) => {
    return (
        
        <div className="recipe-list container col">
              <Link to={'/recipes/create'} >
                <button className="right btn-floating btn-large waves-effect waves-light red">
                    <i className="material-icons">add</i>
                </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <td>Recipe</td>
                  <td>Author</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                { recipeList && recipeList.map(recipe => {
                  return (
                    <RecipeRow targetRecipe={recipe} key={recipe.id}/>
                  )
                })}
              </tbody>
            </table>
        </div>
    )
}


export default RecipeList;