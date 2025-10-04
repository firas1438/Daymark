const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const HOST = import.meta.env.VITE_RAPIDAPI_HOST;

// fetch country codes
export async function fetchCountries() {
  const url = "https://public-holidays7.p.rapidapi.com/codes";
  const options = {
    method: "GET",
    headers: { "x-rapidapi-key": API_KEY, "x-rapidapi-host": HOST },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) { throw new Error(`Failed to fetch countries (status: ${res.status})`); }
    const data = await res.json();
    return data; 
  } catch (error) {
    // failed to fetch country codes
    return []; 
  }
}
