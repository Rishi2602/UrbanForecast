import axios from 'axios';

const apikey='106a14029d7f410ba42150605230310';

const WeatherDataUrl=(city)=>`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7`;
const ApiCall=async(endpoint)=>{
    const options={
        method:'GET',
        url: endpoint,
    }
    try{
        const response=await axios.request(options);
        return response.data;
    }
    catch(error){
        console.log(error);
        return {};
    }
}
export const GetWeatherData=(cityName)=>{
    let apiurl=WeatherDataUrl(cityName);
    console.log(apiurl);
    return ApiCall(apiurl);
};