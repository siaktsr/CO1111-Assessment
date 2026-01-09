// Base URL for Treasure Hunt API
const API_BASE_URL = "https://codecyprus.org/th/api";

/* apiRequest
Internal command for sending and validating API requests.

Expects:
- endpoint: API endpoint string (e.g. ‘/list’)
- params: object with query parameters

Returns:
- normalized API response data

Throws:
- Error with message indicating whether the error is:
- Network / HTTP error (client side)
- API error (server side, status === "ERROR")
*/
async function apiRequest(endpoint, params={}) {
    const url = new URL(API_BASE_URL + endpoint);

    Object.entries(params).forEach(([key, value])=>{
        if(value !== undefined && value !== null){
            url.searchParams.append(key, value);
        }
    });

    let response;
    try{
        response = await fetch(url);
    }catch{
        throw new Error("Client error: Network request failed");
    }

    if(!response.ok){
        throw new Error(`Client error: HTTP ${response.status}`);
    }

    const data = await response.json();

    if(data.status === "ERROR"){
        throw new Error("Server error: " + (data.errorMessages?.join(", ") || "Unknown error"));
    }

    return data;
}   
window.apiRequest = apiRequest; // to be deleted ONLY BY VLAD


/* =========================
   TREASURE HUNT API CALLS
   ========================= */

