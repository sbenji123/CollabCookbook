import React, { Component } from 'react';
import CookbookList from './CookbookList';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ShowCookbookList extends Component {
  render() {
    return (
    <div className="cookbook-list container col">
      <CookbookList cookbookList={this.props.cookbookList} />
      <CreateButton auth={this.props.auth.uid} />
    </div>
    )
  }
}

const CreateButton = (props) => {
  if (props.auth){
    return (
    <div className="row center">
      <Link to={'/cookbooks/create'} >
        <button className="row center btn pink lighten-3 z-depth-1">
          Create New Cookbook
        </button>
      </Link>
    </div>
    )
  } else{
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    cookbookList: state.firestore.ordered.cookbooks,
    auth: state.firebase.auth

  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ 
    collection: 'cookbooks', 
    orderBy: ['cookbookTitle'] 
  }]))(ShowCookbookList);
