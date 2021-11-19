import React from "react"
import { useGlobalContext } from "./Context";
import Message from "./Message";
const Forecast = ()=>{
    console.log("forecast render")
    const {loading,data,error,heading,weathercolor} = useGlobalContext()
    if(loading)
    {
        return (
            <section className = "loading-container">
                <div className = "loading">

                </div>
            </section>
        )
    }
    else if(error)
    {
        return  <Message/>
    }
    else
    {
        const {main:important,sys,visibility,weather,wind:{speed}} = data
        const {feels_like,humidity,pressure,temp,temp_max,temp_min} = important
        const {sunrise,sunset} = sys
        const [{description,icon,main}] = weather
        //kelvin-273.15 = oC
        //new Date(unix*1000).getHour() and getMinutes()
        //m/s - miles/sec - 1m/s  = 2.237 miles
        //1hpa - 1mbar 
        let sunrise_hour = new Date(sunrise*1000).getHours()
        const sunrise_minute = new Date(sunrise*1000).getMinutes() 
        let sunset_hour = new Date(sunset*1000).getHours()
        const sunset_minute = new Date(sunset*1000).getMinutes()
        if(sunrise_hour > 12)
        {
            sunrise_hour = sunrise_hour - 12;
        }  
        if(sunset_hour > 12)
        {
            sunset_hour = sunset_hour -12;
        }
        return (
            <>
            {!error && <h1 className = "heading">{heading}</h1>}
            <div className = "forecast-container">
                <section>
                    <article style = {{backgroundImage:`linear-gradient(to right,${weathercolor.one},${weathercolor.two})`}}>
                        <div className = "upper-grid">
                            <p>{Math.round(temp-273.15)}<sup><span>&deg;C</span></sup></p>
                            <img src = {`https://openweathermap.org/img/w/${icon}.png`}alt = "whether-icon"/>
                        </div>
                        <p className = "desc">{description}</p>
                        <div className = "max-min-container">
                            <h4>Min {Math.round(temp_min-273.15)}&deg;</h4>
                            <h4>Max {Math.round(temp_max-273.15)}&deg;</h4>
                        </div>
                    </article>
                    <article>
                        <img src = "images/shirt.png" alt = "feels_like"/>
                        <p>{Math.round(feels_like-273.15)}&deg;</p>
                        <p>Feels Like</p>
                    </article>
                    <article>
                        <img src = "images/compass.png" alt = "wind"/>
                        <p>{Math.round(speed*3.16)}<sup>kmph</sup></p>
                        <p>Wind</p>
                    </article>
                    <article>
                        <img src = "images/sunrise.png" alt = "sunrise"/>
                        <p>sunrise at</p>
                        <p>{sunrise_hour} : {sunrise_minute} AM</p>
                    </article>
                    <article>
                        <img src = "images/sunset.png" alt = "sunset"/>
                        <p>sunset at</p>
                        <p>{sunset_hour} : {sunset_minute} PM</p>
                    </article>
                    <article>
                        <img src = "images/thermometer.png" alt = "pressure"/>
                        <p>{pressure}<sup>mbar</sup></p>
                        <p>Pressure</p>
                    </article>
                    <article>
                        <img src = "images/humidity.png" alt = "humidity"/>
                        <p>{humidity}%</p>
                        <p>humidity</p>
                    </article>
                    <article>
                        <img src = "images/car.png" alt = "visibility"/>
                        <p>{Math.round(visibility/1609.344)}<sup>miles</sup></p>
                        <p>Visibility</p>
                    </article>
                </section>
            </div>
            </>
    )  
    } 
}
export default Forecast;