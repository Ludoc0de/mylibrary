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
                </p>
                
                <h2 className="explain__title">
                    <b>How</b> use it ?
                </h2>
                <p className="hero__text">
                    1. Write your book title on search bar. <br/>
                </p>
                <svg width="200" height="25" viewBox="0 0 200 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9.99999C0 4.47714 4.47715 0 10 0L185.185 0L186 0C193.732 0 200 6.26801 200 14V14V14C200 20.0154 195.018 24.8352 189.006 24.6362L185.185 24.5098H92.5926H10C4.47716 24.5098 0 20.0326 0 14.5098L0 9.99999Z" fill="#F4F4F4"/>
                    <text x="30" y="20" fill="black">Divergent</text>
                </svg>
                <p className="hero__text">
                    2. Wait the recherche. <br/>
                </p>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="7.5" stroke="#5081E8" stroke-width="5"/>
                </svg>
                <svg width="200" height="25" viewBox="0 0 200 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9.99999C0 4.47714 4.47715 0 10 0L185.185 0L186 0C193.732 0 200 6.26801 200 14V14V14C200 20.0154 195.018 24.8352 189.006 24.6362L185.185 24.5098H92.5926H10C4.47716 24.5098 0 20.0326 0 14.5098L0 9.99999Z" fill="#F4F4F4"/>
                </svg>
                <p className="hero__text">
                    3. Click on the + button to add.<br/>
                </p>
                <svg width="200" height="25" viewBox="0 0 200 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9.99999C0 4.47714 4.47715 0 10 0L185.185 0L186 0C193.732 0 200 6.26801 200 14V14V14C200 20.0154 195.018 24.8352 189.006 24.6362L185.185 24.5098H92.5926H10C4.47716 24.5098 0 20.0326 0 14.5098L0 9.99999Z" fill="#F4F4F4"/>
                </svg>
                <svg className="cross" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C10.8954 0 10 0.895447 10 2V10H2C0.895416 10 0 10.8954 0 12V13C0 14.1046 0.895416 15 2 15H10V23C10 24.1046 10.8954 25 12 25H13C14.1046 25 15 24.1046 15 23V15H23C24.1046 15 25 14.1046 25 13V12C25 10.8954 24.1046 10 23 10H15V2C15 0.895447 14.1046 0 13 0H12Z" fill="#5081E8"/>
                </svg>
            </div>
        </section>
    )
}