import React, {useCallback, useEffect} from "react"
import debounce from "lodash.debounce"
// import AddBook from "./AddBook"

export default function Header(){
    const [search, setSearch]=React.useState("")
    //const [saveValue, setSaveValue]=React.useState("")
    const [book, setBook]= React.useState([])
    console.log(book)
    const [img, setImg]= React.useState([])

    //creat id for each book
    const setId = "Id";
    const [bookId, setBookId]=React.useState(()=>{
        const idValue = localStorage.getItem(setId)
        return idValue === null ? 0: JSON.parse(idValue) 
    })

    useEffect(()=> {
        localStorage.setItem(setId, JSON.stringify(bookId))
    }, [bookId])

    //onclick event addbook
    function bookStorage(){
        console.log("get it")
        searchGetBook()
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
        console.log(putBook)

        books.push(putBook);
        localStorage.setItem("books", JSON.stringify(books));
        setBookId(prevState => prevState + 1)  
        // window.location.reload();
    }

    //get search from input value 
    // const debounceSave = useCallback(
    //     debounce((nextValue) => setSaveValue(nextValue), 800),
    //     []
    // )
    
    function handleChange(event){
        const nextValue = event.target.value
        setSearch(nextValue)
        // debounceSave(nextValue)
    }

    //get bookdata with search
    // useEffect(() => {
        async function searchGetBook(){
            try{
                const res = await fetch(`http://openlibrary.org/search.json?q=${search}`)
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
        // searchGetBook()
    // }, [search])

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
                    !search ? 
                        <label for="searchBook">What's your book?</label>:
                        <label for="searchBook">Is it {search}? Add it!</label>
                }
                <input 
                    className="form__input form__input_color"
                    type="text" 
                    name="searchBook"
                    placeholder="search book: title, author, isbn"
                    value={search}
                    onChange={handleChange}
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