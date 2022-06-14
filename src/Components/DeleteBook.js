
export default function DeleteBook(props){
    
    return(
        <button 
            onClick={()=>props.deleteBook(props.id)}
            className="section__button"
        >        
        </button>
    )
}