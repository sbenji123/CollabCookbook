import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editRecipe } from'../../store/actions/recipeActions'
import { Navigate } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class EditRecipe extends Component {
    state = { recipe: {
                ...this.props.recipe, 
                ingredients: this.props.recipe.ingredients.join('\n'),
                directions: this.props.recipe.directions.join('\n'),
                id: this.props.id,
              },
              recipeError: null,
              submitSuccess: false   
            }
    handleChange = (e) => {
      let newState = {...this.state}
      newState.recipe[e.target.id] = e.target.value
      this.setState({ ...newState })
    }
    handleSubmit = (e) => {
      if (Object.entries(this.state.recipe).every((element) => {
        return element[1] && element[1] !== ''
      })){
        this.setState({
          recipeError: null,
          submitSuccess: true
        })
        this.props.editRecipe(this.state.recipe) 
      } else {
        e.preventDefault();
        this.setState({
          recipeError: "Not all inputs are filled"
        })
      }   
    }
    render() {
        return (
            <div className = "container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Edit Recipe</h5>
                    <div className="input-field">
                        <label className="active" htmlFor="recipeTitle">Recipe Title</label>
                        <input type="text" id="recipeTitle" onChange={this.handleChange} defaultValue={this.state.recipe.recipeTitle}/>
                    </div>
                    <div className="input-field">
                      <label className="active" htmlFor="recipeAttribution">Recipe Attribution</label>
                      <input type="text" id="recipeAttribution" onChange={this.handleChange} defaultValue={this.state.recipe.recipeAttribution}/>
                    </div>
                    <div className="input-field">
                      <label className="active" htmlFor="recipeCategory">Recipe Category</label>
                      <select id="recipeCategory" name="recipeCategory" className="browser-default" 
                              defaultValue={this.state.recipe.recipeCategory !== '' ? this.state.recipe.recipeCategory : "DEFAULT"} onChange={this.handleChange}>
                        <option value="DEFAULT" disabled>Choose a Category</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Soup">Soup</option>
                        <option value="Salad">Salad</option>
                        <option value="Main">Main</option>
                        <option value="Baked Good">Baked Good</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Side">Side</option>
                        <option value="Snack">Snack</option>
                      </select>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="prepTime">Prep Time</label>
                        <input type="text" id="prepTime" onChange={this.handleChange} defaultValue={this.state.recipe.prepTime}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="totalTime">Total Time</label>
                        <input type="text" id="totalTime" onChange={this.handleChange} defaultValue={this.state.recipe.totalTime}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="servingSize">Serving Size</label>
                        <input type="text" id="servingSize" onChange={this.handleChange} defaultValue={this.state.recipe.servingSize}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="ingredients">Ingredients</label>
                        <textarea id="ingredients"  className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.recipe.ingredients}></textarea>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="directions">Directions</label>
                        <textarea id="directions" className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.recipe.directions}></textarea>
                    </div>
                    <div className="input-field">
                      {this.state.submitSuccess ? <Navigate to={'/recipes/'+this.state.recipe.id} /> : null}
                      <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Save</button>
                      <div className="red-text center">
                        { this.state.recipeError ? <p>{this.state.recipeError}</p> : null}
                      </div>
                    </div>
                </form>
            </div>        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[id] : null;
    return {
      recipe: recipe,
      id: id,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editRecipe: (recipe) => dispatch(editRecipe(recipe))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ 
          collection: 'recipes'
        }])
)(EditRecipe);
