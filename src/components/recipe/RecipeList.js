import React from 'react';
import RecipeRow from './RecipeRow'

const RecipeList = ({recipeList}) => {
    return (
        <div>
            <table>
              <thead>
                <tr>
                  <td>Recipe</td>
                  <td>Attribution</td>
                  {/* <td>Delete</td> */}
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