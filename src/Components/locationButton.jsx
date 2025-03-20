import { useStateContext } from "./StateContext";

const WeatherComponent = () => {
    const { weather, getUserLocation, isLocationEnabled, thisLocation } = useStateContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {!isLocationEnabled ? (
                <button 
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md 
                               hover:bg-blue-600 transition duration-200"
                    onClick={getUserLocation}
                >
                    Enable Location
                </button>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
                    <h1 className="text-xl font-bold text-gray-800">
                        Weather in {thisLocation}
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Temperature: {weather.temp}°C
                    </p>
                    <p className="text-gray-600">
                        Humidity: {weather.humidity}%
                    </p>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;
