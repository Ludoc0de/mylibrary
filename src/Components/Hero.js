import heroImage from "../images/reader.png"
export default function Hero(){
    return(
        <section className="hero">
            <img src={heroImage} className="hero__image" />
            <div>
                <h2 className="hero__header">Online Experiences</h2>
                <p className="hero__text">Join unique interactive activities led by 
                one-of-a-kind hosts—all without leaving home.</p>
            </div>
        </section>
    )
}