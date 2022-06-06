import React from 'react'

export default function AddBook(props){
    const [bookId, setBookId]=React.useState(0)

    function handleClick(){
        setBookId(prevId => prevId + 1)
        const books = JSON.parse(localStorage.getItem("books") || "[]");

        const book = {
            id: bookId,
            name: props.author,
            title: props.title,
            pages: props.pages,
            publish_date: props.publish_date,
            format: props.format,
            publisher: props.publisher
        };

        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    return (
        <section>
            <h2>Author: {props.author}</h2>
            <h3>Title: {props.title}</h3>
            {/* <p>{props.languages}</p> */}
            <p>Pages: {props.pages}</p>
            <p>Publish date: {props.publish_date}</p>
            <p>Format: {props.format}</p>
            <p>Editor: {props.publisher}</p>
            <button onClick={handleClick}>Add book</button>
        </section>
    )
}