
export default function DeleteBook(props){
    
    return(
         <button onClick={()=>props.deleteBook(props.id)}>
            Delete book
        </button>
    )
}