import React, {useState, useEffect, createContext} from "react"
import debounce from "lodash.debounce"
import AddBook from "./AddBook"
export const Context = createContext();

export default function Header(){
    const [search, setSearch]=useState({
        searchBook:""
    })
    const [buttonFind, setButtonFind]= useState(true)
    const [book, setBook]= useState([])
    console.log(book)
    const [img, setImg]= useState([])
    const [spin, setSpin]= useState(false)

    //add || remove btn on click 
    const styles= {
        display: buttonFind ? "inline" : "none"
    }

    //search book on click
    async function findBook(){
        //toggle onClick
        setSpin(prevState => !prevState)
        setButtonFind(prevState => !prevState)
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
    
    function handleChange(event){
        setSearch(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    //get cover img from book
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

    //spin till data rdy
    /*click on find book will start spin*/
    /*spin will stop, when get data from book, use useEffect*/


    return(
        <header>
            <nav>
                <h1 className="nav__title" >My library</h1>
                <a className="nav__link" href="#">Get started</a>
            </nav>
            <form onSubmit={handleSubmit}>
                <span className='form__spin'>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.5" cy="12.5" r="10" stroke="#F4F4F4" stroke-width="3"/>
                    </svg>
                </span>
                {
                    !search.searchBook ? 
                        <label for="searchBook">What's your book?</label>:
                        <label for="searchBook">Is it {search.searchBook}? Add it!</label>
                }
                <input 
                    className="form__input form__input_color"
                    type="text" 
                    name="searchBook"
                    placeholder="search book: title, author, isbn"
                    onChange={handleChange}
                    value={search.searchBook}
                />

                <Context.Provider value={[buttonFind, setButtonFind]}>
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
                </Context.Provider>
                <button 
                className="form__button form__button_color"
                onClick={findBook}
                style={styles}
                >
                    find book
                </button>
            </form>
        </header>
    )
}