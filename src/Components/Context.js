import React,{ useContext, useState ,useEffect} from "react"
import setColor from "./Setcolor"
const AppContext = React.createContext()

const AppProvider = ({children})=>{
    const [loading,setLoading] = useState(true)
    const [input,setInput] = useState("")
    const [data,setData] = useState(null)
    const [coords,setCoords] = useState(null)
    const [error,setError] = useState(null)
    const [heading,setHeading] = useState("")
    const [weathercolor,setWeatherColor] = useState("")
    const handleSubmit = async (e)=>{
        try
        {
            e.preventDefault()
            setLoading(true)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=5d2aba5a660006ca5936ff57f5905f9e`)
            const data = await response.json()
            if(data.cod === 200)
            {
                setError("")
                setData(data)
                 const weatherDescription = data.weather[0].main
                 const {one,two} = setColor(weatherDescription)
                 setWeatherColor({one:one,two:two})
                setLoading(false)
                setHeading(`${input} whether forecast`)
                setInput("")
            }
            else 
            {
                setError({status:data.cod,message:data.message})
                setInput("")
                setLoading(false)
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
    const handleInput = (e)=>{
        setInput(e.target.value)
    }
    const getCoordinates = ()=>{
        if(navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(function(position){
            setCoords({latitude:position.coords.latitude,longitude:position.coords.longitude})
        })
        }
        else {
            setError({message:"Geolocation is not supported by this browser"})
            setLoading(false)
        }
    }
    window.addEventListener("load",getCoordinates)
    const fetchData = async (object)=>{
        try
        {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${object.latitude}&lon=${object.longitude}&appid=5d2aba5a660006ca5936ff57f5905f9e`)
        const data = await response.json()
            setData(data)
            const weatherDescription = data.weather[0].main
            const {one,two} = setColor(weatherDescription)
            setWeatherColor({one:one,two:two});
            setLoading(false)
        }
        catch(error)
        {
        console.error(error)
        }
    }
    useEffect(()=>{
        if(coords)
        {
        fetchData(coords)
        }
    },[coords])
    return (
        <AppContext.Provider value = {{
            loading,
            data,
            input,
            error,
            heading,
            handleInput,
            handleSubmit,
            weathercolor
            }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}
export {useGlobalContext,AppProvider};