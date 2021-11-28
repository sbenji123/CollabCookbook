import React from 'react'
import CookbookSummary from './CookbookSummary'

const CookbookList = () => {
    return (
        <div className="cookbook-list section">

            <CookbookSummary />
            <CookbookSummary />
            <CookbookSummary />

        </div>
    )
}

export default CookbookList;