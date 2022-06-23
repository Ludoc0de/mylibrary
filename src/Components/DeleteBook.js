export default function DeleteBook(props){
    
    return(
        <>
            <button 
                onClick={()=>props.deleteBook(props.id)}
                className="section__button"
            > 
                {/* <svg className="svg__bookmark" width="102" height="27" viewBox="0 0 102 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text className="svg__text" x="0" y="20" fill="#5081E8">Delete Book</text>
                    <path className="svg__path" d="M101 1H1L21.5 14.5L1 26H101V1Z" fill="#5081E8" stroke="#5081E8" stroke-width="0.5"/>
                </svg> */}
                <svg className="svg__bookmark" width="101" height="25" viewBox="0 0 101 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="svg__path" 
                        stroke="#5081E8" stroke-width="0.5"
                        d="M0 9.99999C0 4.47714 4.47715 0 10 0L97.2222 0V0C99.9581 0 101.253 3.3736 99.2199 5.20421L95.2852 8.74684C93.1892 
                        10.634 93.1572 13.9107 95.2159 15.8384L99.3114 19.6733C101.227 21.4675 99.842 24.6749 97.2222 24.5098V24.5098H48.6111H10C4.47716 
                        24.5098 0 20.0327 0 14.5098L0 9.99999Z" 
                        fill="#5081E8"
                    />
                </svg>
                <p className="delete__button_text">Delete Book</p>     
            </button>
        </>
    )
}