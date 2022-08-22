import heroImage from "../images/reader.png"
export default function Hero(){
    return(
        <section className="hero">
            <img src={heroImage} className="hero__image" alt="a man sitting and reading a book"/>
            <div className="hero--text__container">
                <h2 className="hero__title">
                    <b>Track</b> your library
                </h2>
                <p className="hero__text">
                    Do you remember all the books you have? <br/>
                    On your space, you can keep your entire library! 
                    You can add new book, delete and know how many books do you have.<br/>
                    Even though it's on the Internet, only you can see and know what's books you save there.
                </p>
            </div>
        </section>
    )
}