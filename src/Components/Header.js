import React, {useEffect} from "react"
import AddBook from "./AddBook"

export default function Header(){
    const[search, setSearch]=React.useState({
        searchBook:""
    })

    const [book, setBook]= React.useState([]) 
    const [img, setImg]= React.useState([])
    
    function handleChange(event){
        const {name, value}= event.target
        setSearch(prevState => {
                return {...prevState,
                [name]:value
            }
        })
    }

    async function searchGetBook(){
            try{
                const res = await fetch(`http://openlibrary.org/search.json?q=${search.searchBook}`)
                const dataBooks = await res.json()
                const data = dataBooks.docs.shift(0)
                if(data){
                  setBook(data)  
                }
            }
            catch(error){
                console.log(`error ${error}`)
            }
        }

    useEffect(() => {
        searchGetBook()
    }, [search])
    
    // async function getAuthor(){
    //     try{
    //         const img = book.authors[0].key
    //         const res = await fetch(`https://openlibrary.org${authors}.json`)
    //         const dataAuthor = await res.json()
    //         setAuthor(dataAuthor)
    //     }
    //     catch(error){
    //         console.log(`error ${error}`)
    //     }
    // }

    // useEffect(() => {
    //     getImg()
    // },[book])

    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <header>
            <nav>
                <h1 className="nav__title" >My library</h1>
                <a href="#">Get started</a>
            </nav>
            <form onSubmit={handleSubmit}>
                <input 
                    className="form__input form__input_color"
                    type="text" 
                    name="searchBook"
                    placeholder="search"
                    value={search.searchBook}
                    onChange={handleChange}
                />
                <AddBook 
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author_name} 
                    pages={book.number_of_pages_median}
                    publish_date={book.first_publish_year}
                    //synopsis={book.first_sentence}
                    publisher={book.publisher}
                    //cover={cover_edition_key}
                />
            </form>
        </header>
    )
}