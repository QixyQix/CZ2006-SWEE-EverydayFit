import ForecastRepo from "../repo/forecastRepo";
import axios from 'axios';

const RetrieveForecastsFromAPI = async()=>{
    console.info('ForecastRepo: RetrieveForecastsFromAPI: Retrieving forecast from NEA API...');
    try{
        const res = await axios.get('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
        console.dir(res);
    }catch(err){
        console.error('ForecastRepo: RetrieveForecastsFromAPI: Error occured whiile retrieving forecast');
        console.error(err.message);
    }
}

const ScheduledService = {
    RetrieveForecastsFromAPI,
}

export {ScheduledService as default};