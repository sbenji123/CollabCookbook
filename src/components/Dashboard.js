import React, { Component } from 'react';
import RecipeList from './recipe/RecipeList'
// import CookbookList from './cookbook/CookbookList'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Dashboard extends Component {
    render(){
        const { recipeList } = this.props;
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        {/* Cookbook List */}
                        {/* <CookbookList /> */}
                    </div>
                    <div className="col s12 m6">
                        {/* Recipe List */}
                        <RecipeList recipeList={recipeList}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recipeList: state.firestore.ordered.recipes
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ 
      collection: 'recipes', 
      orderBy: ['recipeTitle'] 
    }])
)(Dashboard);