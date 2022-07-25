import React, { useContext, useState, useEffect } from 'react'
import { Context } from './Header'

export default function AddBook(props){
    //create or get last id
    const [id, setId]= useState(0)
    useEffect(() => {
        const data = localStorage.getItem('bookId')
        setId(JSON.parse(data))
    }, [])
    
    useEffect(() => {
        localStorage.setItem('bookId', JSON.stringify(id))
    }, [id])

    //get the state from Header
    const [buttonFind, setButtonFind] = useContext(Context)

    const styles= {
        display: buttonFind ? "none" : "inline"
    }

    function bookStorage(){  
        //toggle onClick  
        setButtonFind(prevState => !prevState)
        //increase id on click
        setId(prevState => prevState + 1)
        //get data from local, creat a var with props data to push
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const putBook = {
            id: id,
            name: props.author[0],
            title: props.title,
            pages: props.pages,
            publish_date: props.publish_date,
            publisher: props.publisher[0],
            cover: props.cover,
            count: 1
        }
        books.push(putBook);
        localStorage.setItem("books", JSON.stringify(books)); 

    }

    return (
        <button 
            className="form__button form__button_color"
            onClick={bookStorage}
            style={styles}
        >
            Add book
        </button>
    )
}