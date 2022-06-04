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
          ingredients:'',
          directions:'',
          recipeCategory: '',
          recipeAttribution: '',
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
                  <div className="input-field">
                      <label htmlFor="ingredients">Ingredients</label>
                      <textarea id="ingredients"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                  </div>
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
