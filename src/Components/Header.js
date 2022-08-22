import React, {useState, useEffect, createContext} from "react"
import AddBook from "./AddBook"
export const findContext = createContext();

export default function Header(){
    const [search, setSearch]=useState({
        searchBook:""
    })
    const [book, setBook]= useState([])
    const [img, setImg]= useState([])
    const [spin, setSpin]= useState(false)
    const [find, setFind]= useState(false)
    const [delBtn, setDelBtn]= useState(false)

    const styles= {
        zIndex: delBtn ? 2 : -1,
        opacity: delBtn ? 1 : 0,
        transition: 0.5+'s'
    }

    //pop the delBtn when type in the input
    useEffect(()=> {
        search.searchBook.length > 0 ? 
        setDelBtn(true) : setDelBtn(false)
    },[search.searchBook])

    //remove the input value
    function removeValue(event){
        if(search.searchBook.length > 0) {
            setSearch(prevState => {
                return {
                    ...prevState,
                    searchBook:""
                }
            })
        }
    }

    //search book on click
    async function findBook(){
        //if input, setSpin
        search.searchBook && setSpin(prevState => true)
        //update find boolean
        setFind(prevState => true)
        try{
            const res = await fetch(`https://openlibrary.org/search.json?q=${search.searchBook}`)
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
            </nav>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchBook">Search your book</label>
                 <span>
                    <svg className="svg__spin" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="svg__background" cx="12.5" cy="12.5" r="10"/>
                        <circle className={spin ?"svg__filled" : null} cx="12.5" cy="12.5" r="10" pathLength="1"/>
                    </svg>
                </span>
                <button 
                className="form__button form__button_color form__button_del"
                onClick={removeValue}
                style={styles}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.585787 3.41421C-0.195262 2.63317 -0.195262 1.36684
                         0.585786 0.585787C1.36684 -0.195262 2.63317 -0.195262 3.41421 0.585787L7.65685 4.82843L11.8995 0.585786C12.6805
                          -0.195262 13.9469 -0.195263 14.7279 0.585786C15.509 1.36683 15.509 2.63316 14.7279 3.41421L10.4853 7.65685L14.7279
                           11.8995C15.509 12.6805 15.509 13.9469 14.7279 14.7279C13.9469 15.509 12.6805 15.509 11.8995 14.7279L7.65685 
                           10.4853L3.41421 14.7279C2.63317 15.509 1.36684 15.509 0.585786 14.7279C-0.195262 13.9469 -0.195262 12.6805 
                           0.585786 11.8995L4.82843 7.65685L0.585787 3.41421ZM1.36398 14.0919C0.973454 13.7013 0.973454 13.0682 1.36398 
                           12.6776L6.31372 7.7279L1.36398 2.77816C0.973456 2.38764 0.973455 1.75447 1.36398 1.36395C1.7545 0.973424 2.38767 
                           0.973424 2.77819 1.36395L7.72793 6.31369L12.6777 1.36393C13.0682 0.973408 13.7014 0.973408 14.0919 1.36393C14.4824
                            1.75446 14.4824 2.38762 14.0919 2.77815L9.14215 7.7279L14.0919 12.6777C14.4824 13.0682 14.4824 13.7013 14.0919 
                            14.0919C13.7014 14.4824 13.0682 14.4824 12.6777 14.0919L7.72793 9.14211L2.77819 14.0919C2.38767 14.4824 1.7545 
                            14.4824 1.36398 14.0919Z" fill="#5081E8"
                        />
                    </svg>
                </button>
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

                <findContext.Provider value={[find, setFind]}>
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
                </findContext.Provider>
            </form>
        </header>
    )
}