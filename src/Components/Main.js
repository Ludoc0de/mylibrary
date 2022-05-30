import React, { useEffect } from "react"

export default function Main(){
    const[button, setButton]=React.useState(true)
    const[isbn, setIsbn]=React.useState({
        searchBook:'',
        title:''
    })

    const [book, setBook]= React.useState([])

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
            const data = await res.json()
            console.log(data)
            setBook(data)
        }
        getBook()
    }, [isbn])

    //
    // add another useEffect for author, fetch link above. 
    function getBookData() {
        const authors = book.authors[0].key
        console.log(`https://openlibrary.org/${authors}.json`)
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
            <h2>{isbn.searchBook}</h2>
        </main>
    )
}