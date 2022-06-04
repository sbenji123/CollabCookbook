import React from 'react'
import CookbookDetails from './CookbookDetails'
import { useParams } from 'react-router'

const ShowCookbookPage = () => {
    const { id } = useParams()
    return (
        <CookbookDetails id={id}/>
    )
}

export default ShowCookbookPage

