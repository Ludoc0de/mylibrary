import React from "react"

export default function ViewBook(props){
    return(
        <section>
            <h2>Author: {props.author}</h2>
            <h3>Title: {props.title}</h3>
            <p>Pages: {props.pages}</p>
            <p>Publish date: {props.publish_date}</p>
            <p>Format: {props.format}</p>
            <p>Editor: {props.publisher}</p>
        </section>
    )
}