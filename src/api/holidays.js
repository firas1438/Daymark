const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY; 
const HOST = import.meta.env.VITE_RAPIDAPI_HOST; 

// fetch public country holidays
export async function fetchHolidays(countryCode) {
    const year = new Date().getFullYear();
    const url = `https://public-holidays7.p.rapidapi.com/${year}/${countryCode}`;
    const options = {
        method: "GET",
        headers: { "x-rapidapi-key": API_KEY, "x-rapidapi-host": HOST }
    };
    const res = await fetch(url, options);
    return res.json();
}
