import React, {useState, useEffect, createContext} from "react"
import AddBook from "./AddBook"
export const ButtonFindContext = createContext();

export default function Header(){
    const [search, setSearch]=useState({
        searchBook:""
    })
    const [book, setBook]= useState([])
    const [img, setImg]= useState([])
    const [spin, setSpin]= useState(false)
    const [find, setFind]= useState(false)

    //search book on click
    async function findBook(){
        //
        console.log("find")
        //
        //if input, setSpin
        search.searchBook && setSpin(prevState => true)
        //update find boolean
        setFind(prevState => true)
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
        //launch findBook if Enter keyBoard && find its false
        if(find){
            if(keyName === 'Enter'){
                event.preventDefault()
                return false
            }
        } else {
            keyName === 'Enter' && findBook()
        }
    }

    //update state from spin/btn, get cover img from book
    useEffect(() => {
        //if book data, update spin/btnFind state
        if(book.title){
            setSpin(prevState => false)
            // setButtonFind(prevState => false)
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

    return(
        <header>
            <nav>
                <h1 className="nav__title" >My library</h1>
                <a className="nav__link" href="#">Get started</a>
            </nav>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchBook">Search your book</label>
                 <span>
                    <svg className="svg__spin" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="svg__background" cx="12.5" cy="12.5" r="10"/>
                        <circle className={spin ?"svg__filled" : null} cx="12.5" cy="12.5" r="10" pathLength="1"/>
                    </svg>
                </span>
                <input 
                    className="form__input form__input_color"
                    type="text" 
                    name="searchBook"
                    placeholder="title, author, isbn"
                    onChange={handleChange}
                    //if input, launch keyBoard
                    onKeyDown={search.searchBook ? keyBoard : null}
                    value={search.searchBook}
                />

                {/* <ButtonFindContext.Provider value={[buttonFind, setButtonFind]}> */}
                    <AddBook 
                        id={0}
                        title={book.title}
                        author={book.author_name} 
                        pages={book.number_of_pages_median}
                        publish_date={book.first_publish_year}
                        //synopsis={book.first_sentence}
                        publisher={book.publisher}
                        cover={img}
                        spin={spin}
                    />
                {/* </ButtonFindContext.Provider> */}
            </form>
        </header>
    )
}