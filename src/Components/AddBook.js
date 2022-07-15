import React, { useEffect } from 'react'

export default function AddBook(props){
    console.log(props)
    //create or get last id
    const [id, setId]= React.useState(0)

    useEffect(() => {
        const data = localStorage.getItem('bookId')
        setId(JSON.parse(data))
    }, [])
    
    useEffect(() => {
        localStorage.setItem('bookId', JSON.stringify(id))
    }, [id])

    function bookStorage(){    
        console.log("test")
        setId(prevState => prevState + 1)
        // const books = JSON.parse(localStorage.getItem("books") || "[]");
        // const putBook = {
        //     id: bookId,
        //     name: props.author,
        //     title: props.title,
        //     pages: props.pages,
        //     publish_date: props.publish_date,
        //     publisher: props.publisher[0],
        //     cover: props.cover,
        //     count: 1
        // };

        // books.push(putBook);
        // localStorage.setItem("books", JSON.stringify(books));
        // setBookId(prevState => prevState + 1)  
        // window.location.reload();
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