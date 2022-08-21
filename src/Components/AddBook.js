import React, { useContext, useEffect, useState } from 'react'
import { findContext } from './Header'
import { getBooksNumberContext } from '../App'

export default function AddBook(props){
    const [buttonAdd, setButtonAdd] = useState(false)
    let title = props.title
    // if title, u can add book
    useEffect(() => {
        title ? setButtonAdd(true) : setButtonAdd(false)
    },[title])

    const styles= {
        zIndex: buttonAdd ? 2 : -1,
        opacity: buttonAdd ? 1 : 0,
        transition: 0.7+'s'
    }


    //get the state booksNumber from App
    const [booksNumber, setBooksNumber]= useContext(getBooksNumberContext)
    // get the state buttonFind from Header
    const [find, setFind] = useContext(findContext)
    function bookStorage(){  
        //toggle onClick  
        setButtonAdd(prevState => !prevState)
        setFind(prevState => false)
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
        //setBooksNumber after add a book 
        setBooksNumber(prevState => JSON.parse(localStorage.getItem("books")).length)
    }

    return (
        <button 
            className="form__button form__button_color form__button_add"
            //if find book, launch bookStorage
            onClick={props.title ? bookStorage : null}
            style={styles}
        >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C10.8954 0 10 0.895447 10 2V10H2C0.895416 10 0 10.8954 0 12V13C0 14.1046 0.895416 15 2 15H10V23C10 24.1046 10.8954 25 12 25H13C14.1046 25 15 24.1046 15 23V15H23C24.1046 15 25 14.1046 25 13V12C25 10.8954 24.1046 10 23 10H15V2C15 0.895447 14.1046 0 13 0H12Z" fill="#5081E8"/>
            </svg>
        </button>
    )
}