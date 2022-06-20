import React, { useEffect } from "react"
//import AddBook from "./AddBook"
import ViewBook from "./ViewBook"

export default function Main(){
    const [viewBooks, setViewBooks]= React.useState([])

    //get all storage books
    const viewAllBooks = viewBooks.map(getStorageBooks => {
        return(
            <ViewBook
                id={getStorageBooks.id}
                author={getStorageBooks.name} 
                title={getStorageBooks.title}
                pages={getStorageBooks.pages}
                publish_date={getStorageBooks.publish_date}
                publisher={getStorageBooks.publisher}
                cover={getStorageBooks.cover}
            />
        )
    })

    useEffect(()=> {
        const viewBooks = JSON.parse(localStorage.getItem("books"))
        viewBooks && setViewBooks(viewBooks)
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
