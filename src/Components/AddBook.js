import React, { useContext } from 'react'
import { ButtonFindContext } from './Header'
import { getBooksNumberContext } from '../App'

export default function AddBook(props){
    //get the state booksNumber from App
    const [booksNumber, setBooksNumber]= useContext(getBooksNumberContext)
    //get the state buttonFind from Header
    // const [buttonFind, setButtonFind] = useContext(ButtonFindContext)
    // const styles= {
    //     display: buttonFind ? "none" : "inline"
    // }

    function bookStorage(){  
        //
        console.log("add book")
        //
        //toggle onClick  
        // setButtonFind(prevState => !prevState)

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
            // style={styles}
        >
            Add book
        </button>
    )
}