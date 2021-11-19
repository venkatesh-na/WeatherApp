import {useGlobalContext} from "./Context"
const Message = ()=>{
    const {error} = useGlobalContext()
    return (
        <div className = "error">
            {error.status && <h1>{error.status}</h1>}
            <p>{error.message}</p>
        </div>
    )
    }
export default Message;