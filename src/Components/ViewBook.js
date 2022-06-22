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
            <img className="section__img" src={props.cover}/>
            <div className="section__info">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <ul className="info__ul">
                    <li>Pages</li>
                    <li>Publish Date</li>
                    <li>Editor</li>
                    <li>{props.pages}</li>
                    <li>{props.publish_date}</li>
                    <li>{props.publisher}</li>
                </ul>
                <DeleteBook 
                    id={props.id}
                    deleteBook={deleteBook}
                />
            </div>
        </section>
    )
}