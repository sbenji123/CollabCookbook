import React, { Component } from 'react';
// import RecipeList from './recipe/RecipeList'
import CookbookList from './cookbook/CookbookList'
import { connect } from 'react-redux';

class Dashboard extends Component {
    render(){
        // console.log(this.props)
        // const { recipes } = this.props;
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        {/* Cookbook List */}
                        <CookbookList />
                    </div>
                    <div className="col s12 m6">
                        {/* Recipe List */}
                        {/* <RecipeList recipes={recipes}/> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipe.recipe
    }
}

export default connect(mapStateToProps)(Dashboard);