import React, {useCallback, useEffect} from "react"
import debounce from "lodash.debounce"
import AddBook from "./AddBook"

export default function Header(){
    const [search, setSearch]=React.useState("")
    const [saveValue, setSaveValue]=React.useState("")
    const [book, setBook]= React.useState([]) 
    //const [img, setImg]= React.useState([])
    console.log(book)
    
    //get search from input value 
    const debounceSave = useCallback(()=>
        debounce((nextValue) => setSaveValue(nextValue), 1000),
        []
    )
    
    function handleChange(event){
        const nextValue = event.target.value
        setSearch(nextValue)
        debounceSave(nextValue)
    }

    //get bookdata with search
    useEffect(() => {
        async function searchGetBook(){
            try{
                const res = await fetch(`http://openlibrary.org/search.json?q=${saveValue}`)
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
        searchGetBook()
    }, [saveValue])

    //get img from bookdata
    // function getImg(){
    //      const imgKey = book.cover_edition_key
    //      const img = `https://covers.openlibrary.org/b/olid/${imgKey}.jpg`
    // }

    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <header>
            <nav>
                <h1 className="nav__title" >My library</h1>
                <a href="#">Get started</a>
                {search}
            </nav>
            <form onSubmit={handleSubmit}>
                {saveValue}
                <input 
                    className="form__input form__input_color"
                    type="text" 
                    name="searchBook"
                    placeholder="search"
                    value={search}
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