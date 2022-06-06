import React from "react"

export default function ViewBook(){
    let getBooks = localStorage.getItem("books")
    console.log(JSON.parse(getBooks))
 
       
    return(
        <section>
            <h2>GET BOOK</h2>
        </section>
    )
}