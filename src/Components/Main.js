import React, { useEffect } from "react"

export default function Main(){
    const[button, setButton]=React.useState(true)
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

    useEffect(() => {
        async function getBook(){
            const res = await fetch(`https://openlibrary.org/isbn/${isbn.searchBook}.json`)
            const dataBook = await res.json()
            console.log(dataBook)
            setBook(dataBook)
        }
        getBook()
    }, [isbn])

    useEffect(() => {
        async function getAuthor(){
            const authors = book.authors[0].key
            const res = await fetch(`https://openlibrary.org${authors}.json`)
            const dataAuthor = await res.json()
            console.log(dataAuthor)
            setAuthor(dataAuthor)
        }
        getAuthor()
    },[book])

    function getBookData() {
        const title = book.title
        const authorName = author.name
        const name = author.author
        const langue = book.languages[0].key
        const pages = book.number_of_pages
        const publish = book.publish_date
        const format = book.physical_format
        const editor = book.publishers[0]   
        console.log(title, authorName, name, langue, pages, publish, format, editor)      
    }

    function handleClick(){
        setButton(prevState => !prevState)
    }

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

                <button onClick={handleClick, getBookData}>
                    {button ? "wait ISBN number" : "here your book"}
                </button>
            </form>
            <h2>{book.title}, {book.author}</h2>
        </main>
    )
}