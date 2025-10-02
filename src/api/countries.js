const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY; 
const HOST = import.meta.env.VITE_RAPIDAPI_HOST; 

// fetch country codes 
export async function fetchCountries() { 
    const url = "https://public-holidays7.p.rapidapi.com/codes"; 
    const options = { 
        method: "GET", 
        headers: { "x-rapidapi-key": API_KEY, "x-rapidapi-host": HOST } 
    }; 
    const res = await fetch(url, options); 
    return res.json(); 
} 