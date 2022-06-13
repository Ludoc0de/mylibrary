import React from "react"
import DeleteBook from "./DeleteBook"

export default function ViewBook(props){
   
    function deleteBook(id){
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        let booksArray = books.map(array => array.id)
        let index = booksArray.findIndex(bookIndex => bookIndex === id)
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books))
    }

    return(
        <section>
            <h2>Author: {props.author}</h2>
            <h3>Title: {props.title}</h3>
            <p>Pages: {props.pages}</p>
            <p>Publish date: {props.publish_date}</p>
            <p>Format: {props.format}</p>
            <p>Editor: {props.publisher}</p>
            <DeleteBook 
                id={props.id}
                deleteBook={deleteBook}
            />
        </section>
    )
}