import React, {useCallback, useEffect} from "react"
import debounce from "lodash.debounce"
import AddBook from "./AddBook"

export default function Header(){
    const [search, setSearch]=React.useState("")
    const [saveValue, setSaveValue]=React.useState("")
    const [book, setBook]= React.useState([])
    console.log(book)
    const [img, setImg]= React.useState([])

    //get search from input value 
    const debounceSave = useCallback(
        debounce((nextValue) => setSaveValue(nextValue), 800),
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

    //get cover img from bookdata 
    useEffect(() => {
        async function addCover(){
            try{
                const res = await fetch(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`)
                const dataCover = await res.url
                dataCover.match(/\/OL/) && setImg(dataCover)
            }
            catch(error){
                console.log(`error ${error}`)
            }
        }
        addCover()
    }, [book])

    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <header>
            <nav>
                <h1 className="nav__title" >My library</h1>
<<<<<<< HEAD
                <a href="#">Get started</a>
                {search}
            </nav>
            <form onSubmit={handleSubmit}>
                {saveValue}
=======
                <a className="nav__link" href="#">Get started</a>
            </nav>
            <form onSubmit={handleSubmit}>
                {
                    !saveValue ? 
                        <label for="searchBook">What's your book?</label>:
                        <label for="searchBook">Is it {saveValue}? Add it!</label>
                }
>>>>>>> surface
                <input 
                    className="form__input form__input_color"
                    type="text" 
                    name="searchBook"
<<<<<<< HEAD
                    placeholder="search"
=======
                    placeholder="search book: title, author, isbn"
>>>>>>> surface
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
                    cover={img}
                />
            </form>
        </header>
    )
}