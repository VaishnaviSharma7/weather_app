import { useEffect, useState } from 'react'
import './App.css'
import GetWeather from './Components/GetWeather'

function App() {
  const [ipAddress, setIpAddress] = useState('')
  const [city, setCity] = useState()


  const fetchIp = async ()=>{
    try {
      const response = await fetch(`https://freeipapi.com/api/json/${ipAddress}`)
      const data = await response.json()
      // setInput(data.city)
      // console.log(data)
      setCity(data.cityName)
      // console.log(city)
    } catch (error) {
      console.log(error)
    }
  }
  const getVisitorIp =async ()=>{
     try {
      const response = await fetch('https://api.ipify.org')
      const data = await response.text();
  
      setIpAddress(data)
      fetchIp()
     } catch (error) {
      console.log(err)
     }
  }
  useEffect(() => {
    getVisitorIp()
    
  }, [])

  return (
    <>
    
<GetWeather cities={{city,setCity}} />
    </>
  )
}

export default App
