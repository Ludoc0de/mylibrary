import React from 'react'

export default function Book(props){
    const [bookId, setBookId]=React.useState(0)

    function handleClick(){
        setBookId(prevId => prevId + 1)
        const books = JSON.parse(localStorage.getItem("books") || "[]");

        const book = {
            id: bookId,
            name: "test"
        };

        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    return (
        <section>
            <h2>{props.author}</h2>
            <h3>{props.title}</h3>
            {/* <p>{props.languages}</p> */}
            <p>{props.pages}</p>
            <p>{props.publish_date}</p>
            <p>{props.format}</p>
            <p>{props.publisher}</p>
            <button onClick={handleClick}>Add book</button>
        </section>
    )
}