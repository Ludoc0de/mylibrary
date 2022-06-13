import React, {useEffect} from "react"
import AddBook from "./AddBook"

export default function Header(){
   const[isbn, setIsbn]=React.useState({
        searchBook:''
    })

    const [book, setBook]= React.useState([])
    const [author, setAuthor]= React.useState([])

    //add isbn input 
    function handleChange(event){
        const {name, value}= event.target
        setIsbn(prevState => ({
                ...prevState,
                [name]:value
        }))
    }

    //get bookdata with isbn
    useEffect(() => {
        async function isbnGetBook(){
            const res = await fetch(`https://openlibrary.org/isbn/${isbn.searchBook}.json`)
            const dataBook = await res.json()
            setBook(dataBook)
        }
        isbnGetBook()
    }, [isbn])

    useEffect(() => {
        async function getAuthor(){
            const authors = book.authors[0].key
            const res = await fetch(`https://openlibrary.org${authors}.json`)
            const dataAuthor = await res.json()
            setAuthor(dataAuthor)
        }
        getAuthor()
    },[book])
    
    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <nav>
            <h2>My books</h2>
            <form onSubmit={handleSubmit}>
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
            </form>
        </nav>
    )
}