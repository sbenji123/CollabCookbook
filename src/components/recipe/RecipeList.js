import React from 'react';
import RecipeRow from './RecipeRow'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


const RecipeList = ({recipeList}) => {
    return (
        
        <div className="recipe-list container col">
              <Link to={'/recipe/create'} >
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
            { recipeList && recipeList.map(recipe => {
              return (
                <RecipeRow targetRecipe={recipe}/>
              )
            })}
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
      recipeList: state.recipe.recipeList
  }
}

export default connect(mapStateToProps)(RecipeList)