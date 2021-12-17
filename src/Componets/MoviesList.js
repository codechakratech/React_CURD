import React from 'react'

function MoviesList({title,content}) {
    return (
        <div className="mt-5">
            
<ul className="list-group">
    <li className="list-group-item">{title}</li>
    <li className="list-group-item">{content}</li>

</ul>
            
        </div>
    )
}

export default MoviesList
