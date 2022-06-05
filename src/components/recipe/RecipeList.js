import React from 'react';
import RecipeRow from './RecipeRow'

const RecipeList = ({recipeList}) => {
  if (recipeList && recipeList.length === 0){
    return (
      <div className="row"> 
        There are no recipes to be shown here
      </div>
    )
  }
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
                  const id = recipeList[parseInt(recipeKey)].recipeId ? recipeList[parseInt(recipeKey)].recipeId : recipeList[parseInt(recipeKey)].id
                  return (
                    <RecipeRow targetRecipe={recipeList[recipeKey]} id={id} key={id}/>
                  )
                })}
              </tbody>
            </table>
        </div>
    )
}


export default RecipeList;