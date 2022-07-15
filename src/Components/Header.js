import React, {useCallback, useEffect} from "react"
import debounce from "lodash.debounce"
import AddBook from "./AddBook"

export default function Header(){
    const [search, setSearch]=React.useState({
        searchBook:""
    })
    const [book, setBook]= React.useState([])
    console.log(book)
    const [img, setImg]= React.useState([])

    //create or get last id
    // const [id, setId]= React.useState(0)

    // useEffect(() => {
    //     const data = localStorage.getItem('bookId')
    //     setId(JSON.parse(data))
    // }, [])
    
    // useEffect(() => {
    //     localStorage.setItem('bookId', JSON.stringify(id))
    // }, [id])


    //search book on click
    async function findBook(){
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

        // searchGetBook()
        // setId(prevState => prevState + 1)
        // const books = JSON.parse(localStorage.getItem("books") || "[]");
        // const putBook = {
        //     id: id,
        //     name: book.author_name[0],
        //     title: book.title,
        //     pages: book.number_of_pages_median,
        //     publish_date: book.first_publish_year,
        //     publisher: book.publisher[0],
        //     // cover: img,
        //     count: 1
        // }
        // books.push(putBook);
        // localStorage.setItem("books", JSON.stringify(books)); 
    }
    
    function handleChange(event){
        setSearch(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    //get bookdata with search X
    // useEffect(() => {
    //     async function searchGetBook(){
    //         console.log("test")
    //         try{
    //             const res = await fetch(`http://openlibrary.org/search.json?q=${search.searchBook}`)
    //             console.log(search.searchBook)
    //             const dataBooks = await res.json()
    //             const data = dataBooks.docs.shift(0)
    //             console.log(data)
    //             if(data){
    //                 setBook(data)  
    //             }
    //         }
    //         catch(error){
    //             console.log(`error ${error}`)
    //         }
    //     }
    //     searchGetBook()
    // }, [])

    //get cover img from bookdata 
    // useEffect(() => {
    //     async function addCover(){
    //         try{
    //             const res = await fetch(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`)
    //             const dataCover = await res.url
    //             dataCover.match(/\/OL/) && setImg(dataCover)
    //         }
    //         catch(error){
    //             console.log(`error ${error}`)
    //         }
    //     }
    //     addCover()
    // }, [book])

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

                <button 
                className="form__button form__button_color"
                onClick={findBook}
                >
                    find book
                </button>
            </form>
        </header>
    )
}