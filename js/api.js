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
        completed: data.completed,
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
    const data = await apiRequest("/answer", {
        session: sessionId,
        answer
    });

    return {
        correct: data.correct,
        completed: data.completed,
        message: data.message,
        scoreAdjustment: data.scoreAdjustment
    };
}

/* updateLocation
Expect:
- sessionId //(from startSession)
- latitude
- longitude
Returns:
- server message
*/
export async function updateLocation(sessionId, latitude, longitude) {
    const data = await apiRequest("/location", {
        session: sessionId,
        latitude,
        longitude
    });

    return {
        message: data.message
    };
}

/* skipQuestion
Expect:
- sessionId //(from startSession)
Returns: 
- skip result
*/
export async function skipQuestion(sessionId) {
    const data = await apiRequest("/skip", {
        session:sessionId
    });

    return {
        completed: data.completed,
        message: data.message,
        scoreAdjustment: data.scoreAdjustment
    };
}

/* fetchScore
Expect: 
- sessionId //(from startSession)
Returns:
- score information
*/
export async function fetchScore(sessionId) {
    const data = await apiRequest("/score", {
        session: sessionId
    });

    return {
        player: data.player,
        score: data.score,
        completed: data.completed,
        finished: data.finished
    };
}

/* fetchLeaderboard
Expect:
- sessionId OR treasureHuntId
- sorted (optional)
- limit (optional)
Returns: 
- normalized leaderboard data
*/
export async function fetchLeaderboard({sessionId, treasureHuntId, sorted = false, limit}) {
    const params = [];
    
    if (sessionId) params.session = sessionId;
    if (treasureHuntId) params["treasure-hunt-id"] = treasureHuntId;
    if (sorted) params.sorted = true;
    if (limit) params.limit = limit;

    const data = await apiRequest("/leaderboard", params);

    return{
        treasureHuntName: data.treasureHuntName,
        numOfPlayers: data.numOfPlayers,
        limit: data.limit,
        hasPrize: data.hasPrize,
        leaderboard: data.leaderboard
    }
}