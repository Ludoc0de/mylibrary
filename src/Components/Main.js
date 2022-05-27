import React from "react"

export default function Main(){
    const[button, setButton]=React.useState(true)
    const[isbn, setIsbn]=React.useState({
        searchBook:''
    })

    function handleChange(event){
        const {name, value}= event.target
        setIsbn(prevState =>{
            return {
                ...prevState,
                [name]:value}
        })
    }

    function handleClick(){
        setButton(prevState => !prevState)
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(isbn)
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
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
        </main>
    )
}