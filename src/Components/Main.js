import React, { useEffect } from "react"
//import AddBook from "./AddBook"
import ViewBook from "./ViewBook"

export default function Main(){
    const[isbn, setIsbn]=React.useState({
        searchBook:''
    })

    //const [book, setBook]= React.useState([])
    //const [author, setAuthor]= React.useState([])
    const [viewBooks, setViewBooks]= React.useState([])

    //add isbn input 
    // function handleChange(event){
    //     const {name, value}= event.target
    //     setIsbn(prevState => ({
    //             ...prevState,
    //             [name]:value
    //     }))
    // }

    //get bookdata with isbn
    // useEffect(() => {
    //     async function isbnGetBook(){
    //         const res = await fetch(`https://openlibrary.org/isbn/${isbn.searchBook}.json`)
    //         const dataBook = await res.json()
    //         setBook(dataBook)
    //     }
    //     isbnGetBook()
    // }, [isbn])

    // useEffect(() => {
    //     async function getAuthor(){
    //         const authors = book.authors[0].key
    //         const res = await fetch(`https://openlibrary.org${authors}.json`)
    //         const dataAuthor = await res.json()
    //         setAuthor(dataAuthor)
    //     }
    //     getAuthor()
    // },[book])
    
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
                format={getStorageBooks.format}
                publisher={getStorageBooks.publisher}
            />
        )
    })

    useEffect(()=> {
        const viewBooks = JSON.parse(localStorage.getItem("books"))
        viewBooks && setViewBooks(viewBooks)
    }, [])

    // function handleSubmit(event){
    //     event.preventDefault()
    // }

    return(
        <main>
            {viewAllBooks}
            {/* <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    name="searchBook"
                    placeholder="add isbn book"
                    value={isbn.searchBook}
                    onChange={handleChange}
                />
                <AddBook 
                    key={book.id}
                    id={book.id}
                    author={author.name} 
                    title={book.title}
                    //languages={book.languages[0].key}
                    pages={book.number_of_pages}
                    publish_date={book.publish_date}
                    format={book.physical_format}
                    publisher={book.publishers}
                />
            </form> */}
        </main>
    )
}
