import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navToRecipe, removeRecipe } from '../../store/actions/recipeActions';
import { Link } from 'react-router-dom';

class RecipeRow extends Component {
  state = { ...this.props.targetRecipe };

  removeRecipe = (e) => {
    // need a way so it doesnt flash but still deletes off page
    this.props.removeRecipe(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <tr className='row grey-text text-darken-3'>
        <td>
          <Link to={'/recipe/' + this.state.id}>
            <span className=''>{this.state.recipeTitle}</span>
          </Link>
        </td>
        <td>
          {this.state.authorFirstName + ' ' + this.state.authorLastName}
          {/* Can put a link to all public recipes created by the author */}
        </td>
        <td>
          <button className='btn pink lighten-3 z-depth-1' onClick={this.removeRecipe}> 
            Remove
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navToRecipe: (recipe) => dispatch(navToRecipe(recipe)),
    removeRecipe: (recipe) => dispatch(removeRecipe(recipe)),
  };
};

export default connect(null, mapDispatchToProps)(RecipeRow);
