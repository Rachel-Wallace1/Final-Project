import axios from 'axios';


const WeatherAPI = {
    getLatLngFromZipCode: async function(zipCode) {
        const apiKey = 'AIzaSyBKZub7-r93X7TH3lpJRtFfl8jgqZsgS4k';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const { results } = response.data;

            if (results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                return { latitude: lat, longitude: lng };
            } else {
                throw new Error('Unable to find coordinates for the provided zip code.');
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    }
};

export default WeatherAPI;