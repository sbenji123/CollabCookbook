import React from 'react'
import EditCookbook from './EditCookbook'
import { useParams } from 'react-router'

const ShowCookbookEditPage = () => {
    const { id } = useParams()
    return (
        <EditCookbook id={id}/>
    )
}

export default ShowCookbookEditPage

