
export default function App(){
    //get the data
    
    fetch(`https://openlibrary.org/isbn/9780140328721.json`)
     .then(res => res.json()) 
        .then(data => console.log(data))
        .catch(err => console.log(`error ${err}`));  
    
      return(
        <h1>Test</h1>
    )
}