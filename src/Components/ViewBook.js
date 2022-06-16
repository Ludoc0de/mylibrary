import React from "react"
import DeleteBook from "./DeleteBook"

export default function ViewBook(props){
    function deleteBook(id){
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        let booksArray = books.map(array => array.id)
        let index = booksArray.findIndex(bookIndex => bookIndex === id)
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books))
        window.location.reload();
    }

    return(
        <section className="main__section">
            <img className="section__img"/>
            <div className="section__info">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <ul className="info__ul">
                    <li>{props.pages} Pages</li>
                    <li>{props.publish_date} Publish date</li>
                    <li>{props.publisher} Editor</li>
                </ul>
                <DeleteBook 
                    id={props.id}
                    deleteBook={deleteBook}
                />
            </div>
        </section>
    )
}