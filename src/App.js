import React, {useState, createContext} from "react"
import Header from "./Components/Header"
import Hero from "./Components/Hero"
import Main from "./Components/Main"
import Footer from "./Components/Footer"
import "./dart-sass/style.css"
export const getBooksNumberContext = createContext();


export default function App(){
const books = JSON.parse(localStorage.getItem("books") || "[]");
//get book number
const [booksNumber, setBooksNumber] = useState(books.length)

        return(
            <div>
                <getBooksNumberContext.Provider value={[booksNumber, setBooksNumber]}>
                    <Header />
                    <Hero />
                    <Main />
                    <Footer />
                </getBooksNumberContext.Provider>
            </div>
        )
}