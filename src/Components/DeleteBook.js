export default function DeleteBook(props){
    
    return(
        <>
            <button 
                onClick={()=>props.deleteBook(props.id)}
                className="section__button"
            > 
                <svg className="svg__bookmark" width="102" height="27" viewBox="0 0 102 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text className="svg__text" x="0" y="20" fill="#5081E8">Delete Book</text>
                    <path className="svg__path" d="M101 1H1L21.5 14.5L1 26H101V1Z" fill="#5081E8" stroke="#5081E8" stroke-width="0.5"/>
                </svg>       
            </button>
        </>
    )
}