import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Rangamati');
    const [thisLocation, setLocation] = useState('');

    // Fetch API
    const fetchWeather = async () => {
        console.log('Fetching weather for:', place);

        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: false, // Boolean value
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY, // Check if this is defined
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log('API Response:', response.data);

            if (!response.data.locations || Object.keys(response.data.locations).length === 0) {
                throw new Error('Invalid location');
            }

            const thisData = Object.values(response.data.locations)[0];
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0] || {}); // Ensure no errors if values are empty
        } catch (e) {
            console.error('API Error:', e.response?.data || e.message);
            alert(e.response?.data?.message || 'An error occurred.');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
