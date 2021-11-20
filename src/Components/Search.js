import { useGlobalContext } from "./Context"
const Search = ()=>{
    const {handleSubmit,handleInput,input} = useGlobalContext()
    return (
        <section className = "form-container">
            <form action = "#" onSubmit = {handleSubmit}>
                <input placeholder = "Enter a city name" value = {input} onChange = {(e)=>handleInput(e)} type = "text"/>
                <button type = "submit">Search</button>
            </form>
        </section>
    )
}
export default Search;