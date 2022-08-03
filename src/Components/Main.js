import React, { useState, useEffect } from "react"
//import AddBook from "./AddBook"
import ViewBook from "./ViewBook"

export default function Main(){
    const [viewBooks, setViewBooks]= useState([])

    //get all storage books
    const viewAllBooks = viewBooks.map(getStorageBooks => {
        return(
            <ViewBook
                key={getStorageBooks.id}
                id={getStorageBooks.id}
                author={getStorageBooks.name} 
                title={getStorageBooks.title}
                pages={getStorageBooks.pages}
                publish_date={getStorageBooks.publish_date}
                publisher={getStorageBooks.publisher}
                cover={getStorageBooks.cover}
                //props with callback function to setViewBooks
                onDelete ={() => setViewBooks(
                    prevState => JSON.parse(localStorage.getItem("books")))
                }
            />
        )
    })

    useEffect(()=> {
        const getBooks = JSON.parse(localStorage.getItem("books"))
        getBooks && setViewBooks(getBooks)
    }, [])

    return(
        <main>
            <h2 className="main__title">My books</h2>
            <div className="main__container-section">
                {viewAllBooks}
            </div>
        </main>
    )
}
