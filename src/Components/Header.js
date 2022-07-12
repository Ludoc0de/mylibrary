import React, {useCallback, useEffect} from "react"
import debounce from "lodash.debounce"
// import AddBook from "./AddBook"

export default function Header(){
    const [search, setSearch]=React.useState({
        searchBook:""
    })
    const [book, setBook]= React.useState([])
    const [img, setImg]= React.useState([])

    //create or get last id
    const books = JSON.parse(localStorage.getItem("books"));
    let id = JSON.parse(localStorage.getItem("id"));
    id === null ? id = 0 : id++ 
    localStorage.setItem("id", JSON.stringify(id));
    //console.log(id)

    const [bookId, setBookId] = React.useState(0)

    //add book on click and increase id
    function bookStorage(){
        searchGetBook()
        setBookId(prevState => prevState + 1) 
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const putBook = {
            id: bookId,
            name: book.author_name[0],
            title: book.title,
            pages: book.number_of_pages_median,
            publish_date: book.first_publish_year,
            publisher: book.publisher[0],
            cover: img,
            count: 1
        };
        
        books.push(putBook);
        localStorage.setItem("books", JSON.stringify(books)); 
    }
    
    function handleChange(event){
        setSearch(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    //get bookdata with search
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
                {/* delete */}

                {/* <AddBook 
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author_name} 
                    pages={book.number_of_pages_median}
                    publish_date={book.first_publish_year}
                    //synopsis={book.first_sentence}
                    publisher={book.publisher}
                    cover={img}
                /> */}

                {/* replace */}

                <button 
                className="form__button form__button_color"
                onClick={bookStorage}
                >
                    Add book
                </button>
            </form>
        </header>
    )
}