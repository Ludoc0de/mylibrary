import React from "react"

export default function Main(){
    const[button, setButton]=React.useState(true)

    function handleClick(){
        setButton(prevState => !prevState)
    }

    function handleChange(){
        console.log('yes')
    }

    return(
        <main>
            <div>
                <input 
                    type="text" 
                    name="isbn"
                    placeholder="sear your book"
                    value={isbn.search}
                    onChange={handleChange}
                />

                <button onClick={handleClick}>
                    {button ? "wait ISBN number" : "here your book"}
                </button>
            </div>
        </main>
    )
}