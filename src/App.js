import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q:'kolkata'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {

    const fetchWeather =  async () => {
      const message = query.q ? query.q : 'current location'
      toast.info("Fetching Location for "+ message)

     await getFormattedWeatherData({...query, units}).then((data) => {
      toast.success(`Successfully fetched weather for ${data.name}, ${data.country}!`)
      setWeather(data)
     })
    }
    fetchWeather();

  },[query, units])

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700 ";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700 ";

    return "from-yellow-700 to-orange-700 ";
  };

  const exteriorBackgroundColor = () => {
    if (!weather) return "from-cyan-700 to-blue-400 ";
    const limit = units === "metric" ? 20 : 60;
    if (weather.temp <= limit) return "from-cyan-700 to-blue-400 ";

    return "from-yellow-700 to-orange-400 ";
  }
  return (
  <div className={`bg-gradient-to-br top-0 ${exteriorBackgroundColor()} `}>
   <div className={`mx-auto max-w-screen-md mt-0 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-100 ${formatBackground()}`}>
    <TopButtons setQuery = {setQuery}/>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

    {weather && (
      <>
      
      <TimeAndLocation weather ={weather}/>
      <TemperatureAndDetails weather ={weather}/>
      <Forecast title="Hourly Forecast" items={weather.hourly}/>
      <Forecast title="Daily Forecast" items ={weather.daily}/>
      </>
    )}

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>
   </div>
   </div>
  );
}

export default App;
