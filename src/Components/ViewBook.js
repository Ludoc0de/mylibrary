import React, { useState, useEffect } from 'react'
import DeleteBook from "./DeleteBook"

export default function ViewBook(props){
    //get last id
    const [delId, setDelId]= useState("")
    useEffect(() => {
        const data = localStorage.getItem('bookId')
        setDelId(JSON.parse(data))
    }, [])
    console.log(delId)

    useEffect(() => {
        localStorage.setItem('bookId', JSON.stringify(delId))
    }, [delId])
    
    function deleteBook(id){
        //
        // setDelId(prevState => prevState - 1)

        //
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        let booksArray = books.map(array => array.id)
        let index = booksArray.findIndex(bookIndex => bookIndex === id)
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books))
        // window.location.reload();
    }

    return(
        <section className="main__section">
            <img className="section__img" src={props.cover}/>
            <div className="section__info">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <ul className="info__ul">
                    <li><strong>Pages</strong></li>
                    <li><strong>Publish Date</strong></li>
                    <li><strong>Editor</strong></li>
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