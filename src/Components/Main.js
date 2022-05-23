import React from "react"

export default function Main(){
    const[button, setButton]=React.useState(true)

    function handleClick(){
        setButton(prevState => !prevState)
    }

    return(
        <main>
            <div>
                <input type="text" />
                <button onClick={handleClick}>
                    {button ? "wait ISBN number" : "here your book"}
                </button>
            </div>
        </main>
    )
}