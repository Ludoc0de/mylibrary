import React, { useEffect } from "react"
import Book from "./Book"

export default function Main(){
    const[button, setButton]=React.useState(false)
    const[isbn, setIsbn]=React.useState({
        searchBook:''
    })

    const [book, setBook]= React.useState([])
    const [author, setAuthor]= React.useState([])

    function handleChange(event){
        const {name, value}= event.target
        setIsbn(prevState => ({
                ...prevState,
                [name]:value
        }))
    }

    function handleClick(event){
        setButton(prevState => !prevState)
    }

    useEffect(() => {
        async function getBook(){
            const res = await fetch(`https://openlibrary.org/isbn/${isbn.searchBook}.json`)
            const dataBook = await res.json()
            setBook(dataBook)
        }
        getBook()
    }, [isbn])

    useEffect(() => {
        async function getAuthor(){
            const authors = book.authors[0].key
            const res = await fetch(`https://openlibrary.org${authors}.json`)
            const dataAuthor = await res.json()
            //console.log(dataAuthor)
            setAuthor(dataAuthor)
        }
        getAuthor()
    },[book])

    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    name="searchBook"
                    placeholder="search your book"
                    value={isbn.searchBook}
                    onChange={handleChange}
                />

                <button onClick={handleClick}>
                    {button ? "wait ISBN number" : "here your book"}
                </button>
            </form>
            {
                button && 
                    <Book 
                        author={author.name} 
                        title={book.title}
                        //languages={book.languages[0].key}
                        pages={book.number_of_pages}
                        publish_date={book.publish_date}
                        format={book.physical_format}
                        publisher={book.publishers[0]}
                    />
            }
        </main>
    )
}
