import React from 'react'

export default function Book(props){
    return (
        <section>
            <h2>{props.author}</h2>
            <h3>{props.title}</h3>
            {/* <p>{props.languages}</p> */}
            <p>{props.pages}</p>
            <p>{props.publish_date}</p>
            <p>{props.format}</p>
            <p>{props.publisher}</p>
        </section>
    )
}