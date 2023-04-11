import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editRecipe } from'../../store/actions/recipeActions'
import { Navigate } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


function sectionFirebaseToForm(order, list) {
  if (!order || order.length <= 1) {
    return [list.join('\n')]
  }
  let ret = []
  order.forEach((key) => {
    ret.push(key+'\n'+list[key].join('\n'))
  })
  return ret
}

class EditRecipe extends Component {
    state = { recipe: {
                ...this.props.recipe, 
                ingredient_section_order: [],
                id: this.props.id,
              },
              ingredientSections: this.props.ingredientSections,
              recipeError: null,
              submitSuccess: false   
            }
    handleChange = (e) => {
      let newState = {...this.state}
      let targetId = e.target.id
      let ingrediantIndex = parseInt(targetId.substr(targetId.length-1,1))// gets the last char in the targetId is a num (meaning it is an index of ingredients)
      if (!isNaN(ingrediantIndex)){ // if there is a last number
        newState.recipe.ingredients[ingrediantIndex] = e.target.value
      } else {
        newState.recipe[e.target.id] = e.target.value
      }
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
        
        this.props.editRecipe(this.props.oldRecipe, this.state.recipe) 
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
                    {this.ingredientForm()}
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

    ingredientForm = () => {
      console.log(this.state.recipe.ingredients)
      if (!Array.isArray(this.state.recipe.ingredients)){
        return <div></div>
      }
      return (
        <div>
          {this.state.ingredientSections > 1 ? <div>First line of ingredients list will be section name</div>: null}
          {this.ingredientSections()}
          <div className="row">
            {(this.state.ingredientSections > 1) ? <button className="col btn-small pink" onClick={this.handleSubtractIngredientSection}><i className="material-icons">exposure_neg_1</i></button> : null }
            <div className="col center"><p>Ingredient Section</p></div>
            <button className="col btn-small pink" onClick={this.handleAddIngredientSection}><i className="material-icons">exposure_plus_1</i></button>
          </div>
        </div>
      )
    }
    handleAddIngredientSection = () => {
      console.log("Add section")
      let newRecipe = {...this.state.recipe}
      newRecipe.ingredients = [...newRecipe.ingredients, ""]
      this.setState({
        recipe: newRecipe,
        ingredientSections: this.state.ingredientSections + 1
      })
    }

    handleSubtractIngredientSection = () => {
      console.log("Remove Section")
      let newRecipe = {...this.state.recipe}
      let oldIngredients = this.state.recipe.ingredients
      newRecipe.ingredients = oldIngredients.slice(0, oldIngredients.length - 1)
      newRecipe.ingredients[oldIngredients.length - 2]+="\n"+oldIngredients[oldIngredients.length - 1]
      console.log(newRecipe.ingredients)
      this.setState({
        recipe: newRecipe,
        ingredientSections: this.state.ingredientSections - 1
      })
    }

    ingredientSections = () => {
        if (this.state.ingredientSections === 1){
          return (
            <div  className="input-field">
              <label htmlFor="ingredient0">Ingredients</label>
              <textarea id="ingredient0"  className="materialize-textarea" onChange={this.handleChange} value = {this.state.recipe.ingredients[0]}></textarea>
            </div>)
        } else {
          return (
          this.state.recipe.ingredients.map((ingredients, index) =>
            <div className="input-field" key={index}>
              <label htmlFor={"ingredient"+index}>Ingredients</label>
              <textarea id={"ingredient"+index}  className="materialize-textarea" onChange={this.handleChange} value = {ingredients}></textarea>
            </div>
        ))}
    }

}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    let recipes = state.firestore.data.recipes;
    let recipe = recipes ? recipes[id] : null;
    if (recipe) {
      recipe = {
        ...recipe,
        ingredients: sectionFirebaseToForm(recipe.ingredient_section_order, recipe.ingredients),
        directions: sectionFirebaseToForm(recipe.direction_section_order, recipe.directions)
      }
    }
    console.log(recipe)
    return {
      ingredientSections: (recipe && recipe.ingredient_section_order) ? recipe.ingredient_section_order.length : 1,
      oldRecipe: recipe,
      recipe: recipe,
      id: id,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editRecipe: (oldRecipe, newRecipe) => dispatch(editRecipe(oldRecipe, newRecipe))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ 
          collection: 'recipes'
        }])
)(EditRecipe);
