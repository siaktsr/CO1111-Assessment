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

/* 
============================
   TREASURE HUNT API CALLS
============================
*/

/* fetchTreasureHunts
Fetches available treasure hunts.
 
Expects:
- includeFinished (optional boolean)
Returns:
- Array of treasure hunt objects
 */
export async function fetchTreasureHunts(includeFinished = false){
    const data = await apiRequest("/list", includeFinished ? { "include-finished": true } : {});
    return data.treasureHunts;
}

/* startSession
Expect:
- player: player name
- app: application identifier
- treasureHuntId: selected treasure hunt ID
Returns:
- { sessionId, numOfQuestions }
*/
export async function startSession(player, app, treasureHuntId) {
    const data = await apiRequest("/start", {
        player, 
        app, 
        "treasure-hunt-id": treasureHuntId
    });
    
    return {
        sessionId: data.session,
        numOfQuestions: data.numOfQuestions
    };
}

/* fetchQuestion
Expect:
- sessionId //(from startSession)
Returns:
- All data related to question
*/
export async function fetchQuestion(sessionId) {
    const data = await apiRequest("/question", {session: sessionId });
    return {
        complited: data.complited,
        questionText: data.questionText,
        questionType: data.questionType,
        canBeSkipped: data.canBeSkipped,
        requiresLocation: data.requiresLocation,
        numOfQuestions: data.numOfQuestions,
        currentQuestionIndex: data.currentQuestionIndex,
        correctScore: data.correctScore,
        wrongScore: data.wrongScore,
        skipScore: data.skipScore
    };
}

/* submitAnswer
Expect: 
- sessionId //(from startSession)
- answer

Returns:
- result of the answer submission
*/
export async function submitAnswer(sessionId, answer) {
    const data = await apiRequest("/submit", {
        session: sessionId,
        answer
    });
    return {
        correct: data.correct,
        complited: data.complited,
        message: data.message,
        scoreAdjustment: data.scoreAdjustment
    };
}

/* updateLocation
Expect:
- sessionId
- latitude
- longitude
Returns:
- server message
*/
export async function updateLocation(sessionId, latitude, longitude) {
    const data = await apiRequest("location", {
        session: sessionId,
        latitude,
        longitude
    });

    return {
        message: data.message
    };
}