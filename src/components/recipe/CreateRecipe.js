import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from'../../store/actions/recipeActions'
import { Navigate} from 'react-router-dom'

// need to add image to the state eventually

class CreateRecipe extends Component {
    state = {
        recipe: {
          recipeTitle:'',
          prepTime:'',
          totalTime:'',
          servingSize:'',
          ingredients: [""],
          directions:'',
          recipeCategory: '',
          recipeAttribution: '',
        },
        ingredientSections: 1,
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
      e.preventDefault();
        if (Object.entries(this.state.recipe).every((element) => {
          return element[1] && element[1] !== ''
        })){
          this.setState({
            recipeError: null,
            submitSuccess: true
          })
          this.props.createRecipe(this.state.recipe, this.props.cookbookId) 
        } else {
          e.preventDefault();
          this.setState({
            recipeError: "Not all inputs are filled"
          })
        }     
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
    

    ingredientForm = () => {
      return (
        <div>
          {this.ingredientSections()}
          <div className="row">
            {(this.state.ingredientSections > 1) ? <button className="col btn-small pink" onClick={this.handleSubtractIngredientSection}><i className="material-icons">exposure_neg_1</i></button> : null }
            <div className="col center"><p>Ingredient Section</p></div>
            <button className="col btn-small pink" onClick={this.handleAddIngredientSection}><i className="material-icons">exposure_plus_1</i></button>
          </div>
        </div>
   
      )
    }

    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Navigate to = '/signin' />
      return (
          <div className = "container">
              <form onSubmit={this.handleSubmit} className="white">
                  <h5 className="grey-text text-darken-3">Create Recipe</h5>
                  <div className="input-field">
                      <label htmlFor="recipeTitle">Recipe Title</label>
                      <input type="text" id="recipeTitle" onChange={this.handleChange} />
                  </div>
                  <div className="input-field">
                      <label htmlFor="recipeAttribution">Recipe Attribution</label>
                      <input type="text" id="recipeAttribution" onChange={this.handleChange}/>
                  </div>
                  <div className="input-field">
                    <label className="active" htmlFor="recipeCategory">Recipe Category</label>
                    <select id="recipeCategory" name="recipeCategory" className="browser-default" defaultValue={"DEFAULT"} onChange={this.handleChange}>
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
                      <label htmlFor="prepTime">Prep Time</label>
                      <input type="text" id="prepTime" onChange={this.handleChange}/>
                  </div>
                  <div className="input-field">
                      <label htmlFor="totalTime">Total Time</label>
                      <input type="text" id="totalTime" onChange={this.handleChange}/>
                  </div>
                  <div className="input-field">
                      <label htmlFor="servingSize">Serving Size</label>
                      <input type="text" id="servingSize" onChange={this.handleChange}/>
                  </div>
                  {this.ingredientForm()}
                  <div className="input-field">
                      <label htmlFor="directions">Directions</label>
                      <textarea id="directions"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                  </div>
                  <div className="input-field">
                      {this.state.submitSuccess && this.props.cookbookId ? <Navigate to={'/cookbooks/'+this.props.cookbookId} /> : null}
                      {this.state.submitSuccess && !this.props.cookbookId ? <Navigate to={'/recipes/list'} /> : null}
                      <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Create</button>
                      <div className="red-text center">
                        { this.state.recipeError ? <p>{this.state.recipeError}</p> : null}
                      </div>
                  </div>
              </form>
          </div>        
          )}
}

const mapStateToProps = (state, ownProps) => {
  const { cookbookId } = ownProps;
  return {
    auth: state.firebase.auth,
    cookbookId: cookbookId 
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe, cookbookId) => dispatch(createRecipe(recipe, cookbookId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)
