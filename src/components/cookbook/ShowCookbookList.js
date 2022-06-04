import React, { Component } from 'react';
import CookbookList from './CookbookList';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

export class ShowCookbookList extends Component {
  render() {
    const { cookbookList } = this.props;
    console.log("Cookbooks:",cookbookList)
    return <CookbookList cookbookList={cookbookList} />;
  }
}

const mapStateToProps = (state) => {
  return {
    cookbookList: state.firestore.ordered.cookbooks,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ 
    collection: 'cookbooks', 
    orderBy: ['cookbookTitle'] 
  }]))(ShowCookbookList);
