import React, { useEffect,useRef } from 'react'
import { useState } from 'react'
import Loading from "./loading";
export default function GetWeather({cities}) {
  const [data, setData] = useState();
  const [input, setInput] = useState('');
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
const main = useRef(``)
  const fetchWeather = async () => {
    if (!cities.city) return; 
    else{// Make sure city is provided
    try {
      
      const url = `https://api.openweathermap.org/data/2.5/weather?appid=fcc2fb6c153ae9d7a3812067d4c70333&q=${cities.city.toLowerCase()}&units=metric`;
      setLoading(true)
      setImage('')
      const response = await fetch(url);
      const parsedResponse = await response.json();
      setData(parsedResponse);
      if(parsedResponse.clouds.all  >= 50 ){
        setImage("./images/cloudy.jpg")
      }
      else if(parsedResponse.main.temp<= 15){
        setImage("./images/cold.jpg")
      }
      else if(parsedResponse.main.temp>15 && parsedResponse.main.temp<35){
        setImage("./images/normal.jpeg")
      }
      else if(parsedResponse.main.temp <35){
        setImage("./images/hot.jpg")
      }
      else{
        setImage("./images/normal.jpeg")
      }
      // console.log(data.weather[0].icon)
      console.log(parsedResponse)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching weather data:', error);
setLoading(false)
    }
  }
  };
  useEffect(() => {
    fetchWeather();
  }, [cities.city]);
  return (
 <>

                 <div className="container" style={{
    backgroundImage:`url(${image})`,
    width:"100vw",
    height:"100vh",
    backgroundSize:"cover",
    color:"lightcyan",
    
  }}>
         <form action="" style={{display:"flex",
    paddingTop:"30px",justifyContent:"center"
,
    alignItems:"center"}}>
         <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder='Enter your city' style={{
      width:"60vw",
      borderRadius:"30px",
      height:"30px",
      padding:"10px"
    }}/> <button onClick={(e)=>{
e.preventDefault()
      cities.setCity(input)
      fetchWeather()
    }}
    style={{
      background:"yellow",
      height:"50px",
      width:"20vw",
      padding:"10px",
      borderRadius:"30px"
    }}>Search</button>
         </form>

    {
      loading ? <>
      <div style={{width:"100%",
  display:"flex",
  flexDirection:"column",
  alignContent:"center",
  justifyContent:"center",
  marginTop:"200px"
  }}><Loading/></div></> :
      data && (
        <>
  
            <div style={{marginTop:"50px"}}>   
  { data.name ? (
 <div className="main" style={{
  width:"100%",
  display:"flex",
  flexDirection:"column",
  alignContent:"flex-start",
  marginLeft:"10vw"
 }}>

    <h1 style={{display:"flex",fontSize:"70px",}}>{data.name} <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" /></h1>

        <h3 style={{fontSize:"35px"}}>Feels Like {data.main.feels_like}°C</h3>
        <p></p>
        <div style={{
          background:"pink",
          padding:"20px",
          borderRadius:"5px",
          boxShadow:"5px 5px 5px grey",
          width:"70%",
          margin:"50px 0px"
        }}>
        <h3>Temperature : {data.main.temp}</h3>
        <h3>max/min : {data.main.temp_max}/{data.main.temp_min}</h3>
        <h3>Precipitation : {data.clouds.all}%</h3>
        </div>
        
 </div>
  ): (
<>
<div style={{margin:"40px"}}>
<h3>No data found</h3>
<p>Please check for the spelling of the city</p>
</div>
</>
    
  )
    
  }
          </div>
     
          
        </>
      )}
      
    
      </div>
    
    </>
  )
}
