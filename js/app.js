import{
    displayError
} from "../js/modals.js";

import {
    fetchTreasureHunts,
    startSession
} from "./api.js";

import { 
    showLoader, 
    hideLoader 
} from "../js/loader.js";

const huntsContainer = document.getElementById("hunts-container");
const searchInput = document.getElementById("search-input");
const searchToggle = document.getElementById("search-toggle");
const searchClear = document.getElementById("search-clear");
const includeFinishedCheckbox = document.getElementById("include-finished");
const previousPageBtn = document.getElementById("previousPage");
const nextPageBtn = document.getElementById("nextPage");
const errorMessage = document.getElementById("error-message");

const APP_ID = "3RussiansAndMe_v1.0";

let hunts = [];
let filteredHunts = [];

let page = 0;
const huntsPerPage = 10;

let openCard = null;
let searchOpen = false;

async function loadTreasureHunts() {
    showLoader();
    try {
        const includeFinished = includeFinishedCheckbox.checked;
        hunts = await fetchTreasureHunts(includeFinished);
        applyFilters();
    } catch (error) {
        errorMessage.textContent = error.message;
        displayError(errorMessage.textContent);
    } finally {
        hideLoader();
    }
}

/* Search */
function fuzzyMatch(text, search){
    text = text.toLowerCase();
    search = search.toLowerCase();
    const words = search.split(" ");
    return words.every(word => text.includes(word));
}

function applyFilters() {

    const search = searchInput.value.trim().toLowerCase();
    filteredHunts = hunts.filter(hunt => {
        if (!search) return true;

        return fuzzyMatch(hunt.name, search)
            || fuzzyMatch(hunt.description || "", search);
    });

    sortHunts();
    page = 0;
    renderPage();
}

/* Sorting */
function getStatus(hunt) {
    const now = Date.now();
    if (hunt.endsOn && hunt.endsOn < now) return "finished";
    if (hunt.startsOn && hunt.startsOn > now) return "upcoming";
    return "active";
}

function sortHunts() {
    filteredHunts.sort((a, b) => {
        const statusOrder = {
            active: 0,
            upcoming: 1,
            finished: 2
        };

        const statusA = statusOrder[getStatus(a)];
        const statusB = statusOrder[getStatus(b)];

        if (statusA !== statusB) {
            return statusA - statusB;
        }

        return (a.startsOn || 0) - (b.startsOn || 0);
    });

}

/* Render */
function renderPage() {

    huntsContainer.innerHTML = "";

    if(filteredHunts.length === 0){
        huntsContainer.innerHTML = "<p>No treasure hunts found</p>";
        return;
    }

    const start = page * huntsPerPage;
    const end = Math.min(start + huntsPerPage, filteredHunts.length);

    for (let i = start; i < end; i++) {
        const hunt = filteredHunts[i];
        const card = createCard(hunt);
        huntsContainer.appendChild(card);

    }

    const totalPages = Math.ceil(filteredHunts.length / huntsPerPage);

    if (totalPages <= 1) {
        previousPageBtn.style.display = "none";
        nextPageBtn.style.display = "none";
        return;
    }

    previousPageBtn.style.display = "inline-block";
    nextPageBtn.style.display = "inline-block";

    if (page === 0) {
        previousPageBtn.style.display = "none";
    }

    if (page === totalPages - 1) {
        nextPageBtn.style.display = "none";
    }
}

/* Create Card */
function createCard(hunt){
    const card = document.createElement("div");
    card.classList.add("hunt-card");

    const status = getStatus(hunt);

    if(status === "finished"){
        card.classList.add("finished");
    }

    const title = document.createElement("h3");
    title.textContent = hunt.name;
    const info = document.createElement("p");

    if(status === "active"){
        info.textContent = "Starts now";
    }
    else if(status === "upcoming"){
        info.textContent = "Starts in " + formatTime(hunt.startsOn);
    }
    else{
        info.textContent = "Finished";
    }

    const desc = document.createElement("p");
    desc.textContent = hunt.description ?? "";

    const badge = document.createElement("span");
    badge.classList.add("status-badge");

    if (status === "active") {
        badge.textContent = "LIVE";
        badge.classList.add("active");  
    }
    else if (status === "upcoming") {
        badge.textContent = "SOON";
        badge.classList.add("upcoming");
    }
    else {
        badge.textContent = "DONE";
        badge.classList.add("finished");
    }

    card.appendChild(badge);

    card.appendChild(title);
    card.appendChild(info);
    card.appendChild(desc);

    card.addEventListener("click", (e)=>{
        e.stopPropagation();
        openHuntCard(card , hunt);
    });

    return card;
}

function openHuntCard(card, hunt){

    if (openCard === card) return;

    if(openCard){
        closeOpenCard();
    }

    card.classList.add("expanded");
    card.classList.add("active");

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    closeBtn.classList.add("close-card");

    closeBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        closeOpenCard();
    });

    card.appendChild(closeBtn);

    const status = getStatus(hunt);

    if(status === "finished"){
        const msg = document.createElement("p");
        msg.textContent = "This treasure hunt has finished.";
        msg.classList.add("extra-content");

        card.appendChild(msg);

        openCard = card;
        return;
    }

    if(status === "upcoming"){
        const msg = document.createElement("p");
        msg.textContent = "This hunt starts in " + formatTime(hunt.startsOn);
        msg.classList.add("extra-content");

        card.appendChild(msg);

        openCard = card;
        return;
    }

    const teamInput = document.createElement("input");
    teamInput.placeholder = "Team name";
    teamInput.classList.add("extra-content");

    teamInput.addEventListener("click", e => e.stopPropagation());

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start Game";
    startBtn.classList.add("extra-content");

    startBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        startGame(hunt , teamInput.value);
    });

    card.appendChild(teamInput);
    card.appendChild(startBtn);

    openCard = card;
}

function closeOpenCard(){

    if(!openCard) return;

    openCard.classList.remove("expanded");
    openCard.classList.remove("active");

    const extra = openCard.querySelectorAll(".extra-content, .close-card");

    extra.forEach(el => el.remove());

    openCard = null;
}

/* Start game */
async function startGame(hunt, player) {
    errorMessage.textContent = "";

    if (!player.trim()) {
        errorMessage.textContent = "Enter team name";
        displayError(errorMessage.textContent);
        return;
    }

    showLoader();

    try {
        const session = await startSession(
            player,
            APP_ID,
            hunt.uuid
        );

        const treasureHuntSession = {
            player,
            app: APP_ID,
            treasureHuntId: hunt.uuid,
            sessionId: session.sessionId

        };

        localStorage.setItem(
            "treasureHuntSession",
            JSON.stringify(treasureHuntSession)
        );

        window.location.href = "questions.html";

    } catch (error) {
        errorMessage.textContent = error.message;
        displayError(errorMessage.textContent);
    } finally {
        hideLoader();
    }
}

function formatTime(timestamp) {

    const diff = timestamp - Date.now();

    if (diff <= 0) return "now";

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m ${diff / 1000 % 60}s`;
}

previousPageBtn.addEventListener("click", () => {
    if (page > 0) {
        page--;
        renderPage();
        window.scrollTo(0, 0);
    }
});

nextPageBtn.addEventListener("click", () => {
    if (page < Math.ceil(filteredHunts.length / huntsPerPage) - 1) {
        page++;
        renderPage();
        window.scrollTo(0, 0);
    }
});


searchInput.addEventListener("input", () => {
    applyFilters();

    searchClear.style.display = searchInput.value.trim() ? "block" : "none";

    if(searchInput.value.trim()){
        searchInput.classList.add("active");
        searchOpen = true;
    } else {
        searchInput.classList.remove("active");
        searchOpen = false;
    }
});

searchToggle.addEventListener("click", () => {
    searchOpen = !searchOpen;

    if (searchOpen) {
        searchInput.classList.add("active");
        searchInput.focus();
    } else {
        if (!searchInput.value.trim()) {
            searchInput.classList.remove("active");
        }
    }
});

searchClear.addEventListener("click", e => {
    e.stopPropagation();
    searchInput.value = "";
    searchInput.classList.remove("active");
    searchClear.style.display = "none";
    searchOpen = false;
    applyFilters();
    searchInput.focus();
});

includeFinishedCheckbox.addEventListener("change", loadTreasureHunts);

loadTreasureHunts();

document.addEventListener("click", (event)=>{

    if(openCard && !openCard.contains(event.target)){
        closeOpenCard();
    }
    if(searchOpen && !searchInput.contains(event.target) && !searchToggle.contains(event.target)){
        if(!searchInput.value.trim()){
            searchInput.classList.remove("active");
            searchOpen = false;
        }
    }
});
