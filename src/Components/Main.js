import React, { useEffect } from "react"

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
            {button && 
                <section>
                    <h2>{author.name}</h2>
                    <h3>{book.title}</h3>
                    {/* <h3>true ? {book.languages[0].key} : null</h3> */}
                    {/* {author.author} */}
                    {/* {book.languages[0].key} */}
                    <p>Pages: {book.number_of_pages}</p>
                    <p>{book.publish_date}</p>
                    <p>{book.physical_format}</p>
                    <p>{book.publishers[0]} </p>
                </section>
            }
        </main>
    )
}
