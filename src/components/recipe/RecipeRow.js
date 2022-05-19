import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navToRecipe } from '../../store/actions/recipeActions';
import { Link } from 'react-router-dom';
import DeleteRecipe from './DeleteRecipe';

class RecipeRow extends Component {
  state = { ...this.props.targetRecipe };

  render() {
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
          <DeleteRecipe id={this.state.id} />
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navToRecipe: (recipe) => dispatch(navToRecipe(recipe)),
  };
};

export default connect(null, mapDispatchToProps)(RecipeRow);
