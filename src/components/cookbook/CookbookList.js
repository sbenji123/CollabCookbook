import React from 'react';
import CookbookRow from './CookbookRow'

const CookbookList = ({cookbookList}) => {
    return (
        
        <div className="cookbook-list container col">
            <table>
              <thead>
                <tr>
                  <td>Cookbook</td>
                  <td>Author</td>
                  {/* <td>Delete</td> */}
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