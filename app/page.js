'use client'
import { useState } from "react"
export default function Home() {
  const INITIALSTATE = {
    location: '',
    date: '',
    conditionText: '',
    conditionIcon: '',
    temp: '',
    cloud: '',
    windSpeed: '',
    Humidity: '',
    feelsLike: '', 
    region: '',
    country: '',
  }

  const FORMSTATE = ''
  const [data, setData] = useState(INITIALSTATE)
  const [formLocation, setFormLocation] = useState(FORMSTATE)
  
  function handleChange(e){
    setFormLocation(e.target.value)
  }
  async function handleSubmit(e){
    e.preventDefault()

    try {
	    const response = await fetch(`/api/?location=${formLocation}`)
	    const result = await response.json();
      setData({
        location: result.location.name,
        feelsLike: result.current.feelslike_c,
        temp: result.current.temp_c,
        humidity: result.current.humidity,
        windSpeed: result.current.wind_mph,
        cloud: result.current.cloud,
        conditionText: result.current.condition.text,
        conditionIcon: result.current.condition.icon,
        date: result.location.localtime.toLocaleString(),
        region: result.location.region,
        country: result.location.country
      })
      setFormLocation(FORMSTATE)
    } catch (error) {
	    console.error(error);
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-full text-white font-bold text-xl">
      <div className='col-span-1 md:col-span-2 lg:col-span-3'>
        <div className=' flex flex-col justify-between items-between h-full p-12'>
        <div>My Weather App</div>
        <div className="flex flex-row items-center gap-12">
            <div>
            <h1 className="text-6xl">{data.temp} &#8451;</h1>
            </div>
            <div>
            <h1>{data.location}</h1>
            <h1>{data.date}</h1>
            </div>
            <div> 
            <h1>{data.conditionText}</h1>
              {data.conditionIcon &&
            <img className="w-10 h-10" src={data.conditionIcon} />
              }
            </div>
          </div>
        </div>
      </div>
      <div className='bg-black/30 col-span-1 md:col-span-1 lg:col-span-2'>
        <div className="flex flex-col gap-12 p-12">
          <form className="w-full">
            <div className="flex gap-4 w-full">
              <input className="bg-transparent border-b border-white w-full focus:border-b focus:outline-none" type='text' name='location' placeholder='Location, Postcode, City or Area' onChange={handleChange} value={formLocation}/>
              <button className="bg-green-500/75 px-4 py-2" onClick={handleSubmit}>S</button>
            </div>
          </form>
          <div className="flex flex-col gap-8 items-start justify-start">
            <h1>Location Details</h1>
            <p className="font-normal">Location: <span className="font-bold">{data.location}</span></p>
            <p className="font-normal">Region: <span className="font-bold">{data.region}</span></p>
            <p className="font-normal">Country: <span className="font-bold">{data.country}</span></p>
          </div>
          <hr />
          <div className="flex flex-col gap-8 items-start justify-start">
            <h1>Weather Details</h1>
            <p className="font-normal">Cloud: <span className="font-bold">{data.cloud}</span></p>
            <p className="font-normal">Wind Speed: <span className="font-bold">{data.windSpeed}</span> MPH</p>
            <p className="font-normal">Humidity: <span className="font-bold">{data.humidity}</span></p>
            <p className="font-normal">Feels Like: <span className="font-bold">{data.feelsLike}</span> &#8451; </p>
          </div>
        </div>
      </div>
   </div>
  )
}
