import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify'
const Inputs = ({setQuery, units, setUnits}) => {

  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    if (city !== '') {
      setQuery({q:city})
      
    }
  }

  const handleLocationClick= () => {
    if(navigator.geolocation) {
      toast.info("Fetching User's Location")
      navigator.geolocation.getCurrentPosition((position)=>{
        toast.success("Successfully fetched user's location")
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        setQuery({lat,lon})
      })
    }
  }

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) {
      setUnits(selectedUnit)
      
    }

  }

 

  return (
   <div className='flex flex-row justify-center my-6'>
    <div className='flex flex-row items-center justify-center space-x-4 w-3/4'>
        <input 
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
        type="text" 
        placeholder='search city here....'
        className='text-xl font-light p-2 shadow-xl focus:outline-none w-full capitalize placeholder:lowercase' />
        <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125 ' onClick ={handleSearchClick}/>
        <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125 ' onClick={handleLocationClick}/>

    </div>

    <div className='flex flex-row items-center justify-center w-1/4 '>
        <button name='metric' className='text-white text-xl font-light hover:scale-110 duration-200' onClick={handleUnitChange}>°C</button>
        <p className='mx-1 text-white'>|</p>
        <button name='imperial' className='text-white text-xl font-light hover:scale-110 duration-200' onClick={handleUnitChange}>°F</button>
    </div>

   </div>
  )
}

export default Inputs