import React, { useContext, useState, useEffect } from 'react'
import { ButtonFindContext } from './Header'

export default function AddBook(props){
    //get default id or get last one
    // const [bookId, setBookId]= useState(props.id)
    // console.log(bookId)
    // useEffect(() => {
    //     const data = localStorage.getItem('bookId')
    //     console.log(data)
    //     data === null ? setBookId(JSON.parse(props.id)) : setBookId(JSON.parse(data)) 
    // }, [])
    
    // useEffect(() => {
    //     localStorage.setItem('bookId', JSON.stringify(bookId))
    // }, [bookId])

    //get the state buttonFind from Header
    const [buttonFind, setButtonFind] = useContext(ButtonFindContext)

    const styles= {
        display: buttonFind ? "none" : "inline"
    }

    function bookStorage(){  
        //toggle onClick  
        setButtonFind(prevState => !prevState)

        //increase bookId on click
        //setBookId(prevState => prevState + 1)

        //get data from local
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        //get the last id and increase onClick
        const booksId = books.map(array => array.id)
        const bookId = booksId[booksId.length-1]+1
        const putBook = {
            //putBook.id = 0 if undef 
            id: booksId.length > 0 ? bookId : props.id,
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