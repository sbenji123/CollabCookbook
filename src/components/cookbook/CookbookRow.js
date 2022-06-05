import React from 'react';
import { Link } from 'react-router-dom';

const CookbookRow = (props) => {
  const cookbook = props.targetCookbook
  return (
    <tr className='row grey-text text-darken-3'>
      <td>
        <Link to={'/cookbooks/' + cookbook.id}>
          <span className=''>{cookbook.cookbookTitle}</span>
        </Link>
      </td>
      <td>
        {cookbook.cookbookAttribution}
        {/* Can put a link to all public recipes created by the author */}
      </td>
      {/* <td>
        Delete{/* <DeleteCookbook id={this.state.id} />}
      </td> */}
    </tr>
  );
}

export default CookbookRow