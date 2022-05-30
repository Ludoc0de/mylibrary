import React, { useEffect } from "react"

export default function Main(){
    const[button, setButton]=React.useState(true)
    const[isbn, setIsbn]=React.useState({
        searchBook:'',
        author:'',
        title:'',
        langue:'',
        pages:'',
        publish:'',
        format:'',
        editor:'',
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
            <h2>{isbn.title}, {isbn.author}</h2>
        </main>
    )
}