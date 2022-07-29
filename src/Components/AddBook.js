import React, { useContext, useState, useEffect } from 'react'
import { ButtonFindContext } from './Header'

export default function AddBook(props){
    console.log(props)
    /*increase books.id */ 
    const test = JSON.parse(localStorage.getItem('books'))
    console.log(test[0].id)

    //get default id or get last one
    const [bookId, setBookId]= useState(props.id)
    console.log(bookId)
    useEffect(() => {
        const data = localStorage.getItem('bookId')
        console.log(data)
        data === null ? setBookId(JSON.parse(props.id)) : setBookId(JSON.parse(data)) 
    }, [])
    
    useEffect(() => {
        localStorage.setItem('bookId', JSON.stringify(bookId))
    }, [bookId])

    //get the state buttonFind from Header
    const [buttonFind, setButtonFind] = useContext(ButtonFindContext)

    const styles= {
        display: buttonFind ? "none" : "inline"
    }

    function bookStorage(){  
        //toggle onClick  
        setButtonFind(prevState => !prevState)
        //increase bookId on click
        setBookId(prevState => prevState + 1)
        //get data from local, creat a var with props data to push
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const putBook = {
            id: props.id+1,
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