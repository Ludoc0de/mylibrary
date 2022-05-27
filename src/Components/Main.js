import React from "react"

export default function Main(){
    const[button, setButton]=React.useState(true)
    const[isbn, setIsbn]=React.useState({
        searchBook:''
    })

    console.log(isbn)
    function handleClick(){
        setButton(prevState => !prevState)
    }

    function handleChange(event){
        const {name, value}= event.target
        setIsbn(prevState =>{
            return {
                ...prevState,
                [name]:value}
        })
    }

    return(
        <main>
            <div>
                <form>
                    <input 
                        type="text" 
                        name="searchBook"
                        placeholder="search your book"
                        value={isbn.searchBook}
                        onChange={handleChange}
                    />

                    <button onClick={handleClick}>
                        {button ? "wait ISBN number" : "here your book"}
                    </button>
                </form>
            </div>
        </main>
    )
}