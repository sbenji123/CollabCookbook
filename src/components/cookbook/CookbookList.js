import React from 'react';
import CookbookRow from './CookbookRow'
import { Link } from 'react-router-dom';

const CookbookList = ({cookbookList}) => {
    return (
        
        <div className="cookbook-list container col">
            <Link to={'/cookbooks/create'} >
                <button className="right btn-floating btn-large waves-effect waves-light red">
                    AddC
                </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <td>Cookbook</td>
                  <td>Author</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                { cookbookList && cookbookList.map(cookbook => {
                  return (
                    <CookbookRow targetCookbook={cookbook} key={cookbook.id}/>
                  )
                })}
              </tbody>
            </table>
        </div>
    )
}


export default CookbookList;