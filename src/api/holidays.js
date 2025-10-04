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

  try {
    const res = await fetch(url, options);
    if (!res.ok) { throw new Error(`No holidays found for country "${countryCode}" (status: ${res.status})`); }
    const data = await res.json();
    return data; 
  } catch (error) {
    // failed to fetch holidays, return an empty array
    return []; 
  }
}
