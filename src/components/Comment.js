import React from 'react'

export default function Comment(props) {
    return (
        <div>
            <p>{props.posted_by}: {props.content}</p>
        </div>
    )
}
