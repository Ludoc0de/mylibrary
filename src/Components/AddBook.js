import React, { useEffect } from 'react'

export default function AddBook(props){
    const setId = "Id";
    const [bookId, setBookId]=React.useState(()=>{
        const idValue = localStorage.getItem(setId)
        return idValue === null ? 0: JSON.parse(idValue) 
    })

    useEffect(()=> {
        localStorage.setItem(setId, JSON.stringify(bookId))
    }, [bookId])

    function bookStorage(){    
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const putBook = {
            id: bookId,
            name: props.author,
            title: props.title,
            pages: props.pages,
            publish_date: props.publish_date,
            publisher: props.publisher[0],
<<<<<<< HEAD
            cover: props.cover
=======
            cover: props.cover,
            count: 1
>>>>>>> surface
        };

        books.push(putBook);
        localStorage.setItem("books", JSON.stringify(books));
        setBookId(prevState => prevState + 1)  
        window.location.reload();
    }

    return (
        <button 
            className="form__button form__button_color"
            onClick={bookStorage}
        >
            Add book
        </button>
    )
}