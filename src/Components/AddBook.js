import React from 'react'

export default function AddBook(props){
    const [bookId, setBookId]=React.useState(0)

    function bookStorage(){
        console.log("test")
        setBookId(prevId => prevId + 1)
        const books = JSON.parse(localStorage.getItem("books") || "[]");

        const putBook = {
            id: bookId,
            name: props.author,
            title: props.title,
            pages: props.pages,
            publish_date: props.publish_date,
            format: props.format,
            publisher: props.publisher[0]
        };

        books.push(putBook);
        localStorage.setItem("books", JSON.stringify(books));
        window.location.reload();
    }

    return (
        <button onClick={bookStorage}>
            Add book
        </button>
    )
}