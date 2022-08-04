import React, {useState, useEffect, createContext} from "react"
import AddBook from "./AddBook"
export const ButtonFindContext = createContext();

export default function Header(){
    const [search, setSearch]=useState({
        searchBook:""
    })
    const [buttonFind, setButtonFind]= useState(true)
    const [book, setBook]= useState([])
    const [img, setImg]= useState([])
    const [spin, setSpin]= useState(false)

    //add || remove btn on click 
    const styles= {
        display: buttonFind ? "inline" : "none"
    }

    //search book on click
    async function findBook(){
        //if input, setSpin
        search.searchBook && setSpin(prevState => true)
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

    function keyBoard(event){
        const keyName = event.key
        //launch findBook if Enter keyBoard
        if(keyName === 'Enter'){
            console.log("yes enter")
            findBook()
        }
    }

    //update state from spin/btn, get cover img from book
    useEffect(() => {
        //if book data, update spin/btnFind state
        if(book.title){
            setSpin(prevState => false)
            setButtonFind(prevState => false)
        }

        async function addCover(){
            try{
                const res = await fetch(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`)
                const dataCover = await res.url
                //if link to img then setImg
                dataCover.match(/\/OL/i) && setImg(dataCover)
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

    /* fix position spinner */


    return(
        <header>
            <nav>
                <h1 className="nav__title" >My library</h1>
                <a className="nav__link" href="#">Get started</a>
            </nav>
            <form onSubmit={handleSubmit}>
                <span className='form__spin'>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="svg_background"cx="12.5" cy="12.5" r="10"/>
                        <circle className={spin ?"svg_filled" : null} cx="12.5" cy="12.5" r="10" pathLength="1"/>
                    </svg>
                </span>
                <label htmlFor="searchBook">Get your book</label>
                <input 
                    className="form__input form__input_color"
                    type="text" 
                    name="searchBook"
                    placeholder="search book: title, author, isbn"
                    onChange={handleChange}
                    //if input, launch keyBoard
                    onKeyDown={search.searchBook ? keyBoard : null}
                    value={search.searchBook}
                />

                <ButtonFindContext.Provider value={[buttonFind, setButtonFind]}>
                    <AddBook 
                        id={0}
                        title={book.title}
                        author={book.author_name} 
                        pages={book.number_of_pages_median}
                        publish_date={book.first_publish_year}
                        //synopsis={book.first_sentence}
                        publisher={book.publisher}
                        cover={img}
                    />
                </ButtonFindContext.Provider>
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