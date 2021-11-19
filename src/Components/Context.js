import React,{ useContext, useState ,useEffect} from "react"
const AppContext = React.createContext()

const AppProvider = ({children})=>{
    const [loading,setLoading] = useState(true)
    const [input,setInput] = useState("")
    const [data,setData] = useState(null)
    const [coords,setCoords] = useState(null)
    const [error,setError] = useState(null)
    const [heading,setHeading] = useState("")
    const [weathercolor,setWeatherColor] = useState("")
    function setWhetherColor(value)
        {
            switch(value)
            {
                case "Mist":
                case "Dust":
                case "Fog":
                case "Sand":
                case "Ash":
                case "Squall":
                case "Tornado":
                case "Haze":
                    setWeatherColor({one:"rgb(88, 85, 66)",two:"rgb(161, 142, 90)"});
                    break;
                case "Rain":
                    setWeatherColor({one:"rgb(26, 53, 83)",two:"rgb(57, 76, 116)"});
                    break;
                case "Clouds":
                        setWeatherColor({one:"rgb(116, 126, 158)",two:"rgb(122, 145, 175)"});
                        break;
                case "Clear": 
                        setWeatherColor({one:"rgb(77, 88, 255)",two:"rgb(214, 237, 255)"});
                        break;
                case "Smoke":
                        setWeatherColor({one:"rgb(49, 49, 49)",two:"rgb(48, 48, 48)"});
                        break;
                case "Thunderstorm":
                    setWeatherColor({one:"rgb(41, 44, 71)",two:"rgb(65, 20, 66)"});
                    break;
                case "Drizzle":
                    setWeatherColor({one:"rgb(179, 255, 245)",two:"rgb(52, 51, 92)"});
                    break;
                case "Snow":
                    setWeatherColor({one:"rgb(240, 240, 240)",two:"rgb(146, 146, 146)"});
                    break;
                default:
                    setWeatherColor({one:"rgb(0, 17, 19)",two:"rgb(0, 17, 19)"})
            }

        }
    const handleSubmit = async (e)=>{
        try
        {
            e.preventDefault()
            setLoading(true)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=5d2aba5a660006ca5936ff57f5905f9e`)
            const data = await response.json()
            if(data.cod == 200)
            {
                setError("")
                setData(data)
                 const weatherDescription = data.weather[0].main
                 setWhetherColor(weatherDescription);
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
            setWhetherColor(weatherDescription);
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