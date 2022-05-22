
export default function Main(){
    function handleClick(){
        console.log("got it")
    }

    return(
        <main>
            <div>
                <input type="text" />
                <button onClick={handleClick}>Get the book with ISBN</button>
            </div>
        </main>
    )
}