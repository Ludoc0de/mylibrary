import Header from "./Components/Header"
import Hero from "./Components/Hero"
import Main from "./Components/Main"
import Footer from "./Components/Footer"
// import "./reset.css"
import "./style.css"


export default function App(){
        return(
            <div className="container">
                <Header />
                <Hero />
                <Main />
                <Footer />
            </div>
        )
}