// questions.js
// Handles rendering questions, submitting answers, skipping questions

import {
    fetchQuestion,
    submitAnswer,
    skipQuestion
} from "../js/api.js"

// DOM Elements
const questionTextEl = document.getElementById("question-text");
const questionTypeEl = document.getElementById("question-type");
const answerSectionEl = document.getElementById("answer-section");
const messageEl = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");
const skipBtn = document.getElementById("skip-btn");

// State
let sessionId = null;
let currentQuestion = null;
let selectedAnswer = null;


// Initialization
init();

function init(){
    const StoredData = localStorage.getItem("treasureHuntSession");

    if(!StoredData){
        alert("Sessoin data not found.");
        window.location.href = "../test/test.html";
    }
    const sessionData = JSON.parse(StoredData);
    sessionId = sessionData.sessionId;

    loadQuestion();
}

/* loadQuestion
Fetches a question from the API and renders it.
*/
async function loadQuestion() {
    clearUI();
    try{
        const data = await fetchQuestion(sessionId);
        currentQuestion = data;

        if(data.completed){
            showGameCompleted();
            return;
        }
        selectedAnswer = null;
        renderQuestion(data);
    }catch(error){
        showMessage(error.message);
    }
}

/* renderQuestion
Renders question text and input controls based on question type.
*/
async function renderQuestion(question) {
    questionTextEl.innerHTML = question.questionText;
    questionTypeEl.textContent = `Type: ${question.questionType}`;

    renderAnswerInput(question.questionType);
}

/* renderAnswerInput
Renders input controls depending on question type.
*/
async function renderAnswerInput(type) {
    answerSectionEl.innerHTML = "";

    if(type === "BOOLEAN"){
        createBtn("Yes/True", "true");
        createBtn("No/False", "false");
    }

    if(type === "MCQ"){
        ["A", "B", "C", "D"].forEach(letter => {
            createBtn(letter, letter);
        });
    }

    if(type === "NUMERIC" || type === "INTEGER"){
        const input = document.createElement("input");
        input.type = "number";
        input.id = "numeric-answer";
        answerSectionEl.appendChild(input);
    }

    if(type === "TEXT"){
        const input = document.createElement("input");
        input.type = "text";
        input.id = "text-answer";
        answerSectionEl.appendChild(input);
    }
}

/* createBtn
Creates an answer button.
*/
async function createBtn(label, value) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.classList.add("answer-btn");

    btn.onclick = () => {
        selectedAnswer = value;

        // remove active class from all buttons
        document.querySelectorAll(".answer-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
    };

    answerSectionEl.appendChild(btn);
}


/* Event Handlers */

submitBtn.addEventListener("click", ()=>{
    if(!currentQuestion)return;

    if(currentQuestion.questionType === "BOOLEAN" 
    || currentQuestion.questionType === "MCQ"){

        if(!selectedAnswer){
            showMessage("Please select an answer.");
            return;
        }

        submit(selectedAnswer);
        return;
    }

    if(currentQuestion.questionType === "NUMERIC" 
    || currentQuestion.questionType === "INTEGER"){

        const input = document.getElementById("numeric-answer");
        if(!input || input.value === ""){
            showMessage("Please enter a number.");
            return;
        }

        submit(input.value);
    }

    if(currentQuestion.questionType === "TEXT"){
        const input = document.getElementById("text-answer");
        if(!input || input.value.trim() === ""){
            showMessage("Please enter an answer.");
            return;
        }

        submit(input.value);
    }
});


/* submit
Submits an answer to the server.
*/
async function submit(answer) {
    try{
        const result = await submitAnswer(sessionId, answer);
        addToHistory(currentQuestion, answer, result);
        document.dispatchEvent(new CustomEvent("answer-submitted"));
        showMessage(result.message);

        if(result.completed){
            showGameCompleted();
            return;
        }

        if(result.correct){
            setTimeout(() => {
                loadQuestion();
            }, 800);
        }

    }catch(error){
        showMessage(error.message);
    }
}

/* skipBtn
*/
skipBtn.addEventListener("click", async () => {
    if(!currentQuestion.canBeSkipped){
        alert("This question cannot be skipped.");
        return;
    }
    try{
        const result = await skipQuestion(sessionId);
        addToHistory(currentQuestion, null, { correct: false, skipped: true });
        document.dispatchEvent(new CustomEvent("answer-submitted"));
        showMessage(result.message);
        loadQuestion();
    }catch(error){
        showMessage(error.message);
    }
});

/* Helpers */

/* clearUI
Clears UI sections before rendering a new question.
*/
function clearUI(){
    questionTextEl.textContent = "Loading question...";
    questionTypeEl.textContent = "";
    answerSectionEl.innerHTML = "";
    messageEl.textContent = "";
}

/* showMessage
Displays a message to the user.
*/
function showMessage(message){
    messageEl.textContent = message;
}

/* showGameCompleted
Displays game completion UI.

NOTE: this is a temporary function that must later be replaced with the correct one
*/
function showGameCompleted(){
    questionTextEl.textContent = "Game Completed!";
    answerSectionEl.innerHTML = "";

    submitBtn.style.display = "none";
    skipBtn.style.display = "none";

    const btn = document.createElement("button");
    btn.textContent = "Go to Leaderboard";
    btn.classList.add("primary-btn");
    btn.onclick = () => {
        window.location.href = "leaderboard.html";
    };

    answerSectionEl.appendChild(btn);
}

// QR code 
// Get QR-related DOM elements
const qrBtn = document.getElementById("qr-btn");
const qrSection = document.getElementById("qr-section");
const preview = document.getElementById("preview");
const closeQrBtn = document.getElementById("close-qr-btn");
const switchCameraBtn = document.getElementById("switch-camera-btn");

// Scanner state variables
let cameras = [];
let currentCameraIndex = 0;
let scanner = null;

qrBtn.addEventListener("click", () => {
    startScanner();
});

closeQrBtn.addEventListener("click", () => {
    stopScanner();
});

/* startScanner()
 Initializes the Instascan scanner,
 retrieves available cameras,
 selects a camera (preferably back camera on mobile),
 and starts the video stream.
*/
function startScanner() {
    qrBtn.style.display = "none";
    qrSection.style.display = "block";

    scanner = new Instascan.Scanner({ video: preview });

    scanner.addListener("scan", function (content) {
        console.log("QR scanned:", content);

        stopScanner();

        showQrResult(content);
    });

    Instascan.Camera.getCameras().then(function (availableCameras) {

        if (availableCameras.length > 0) {
            
            cameras = availableCameras;
            console.log(cameras);

            if (currentCameraIndex - 1 == cameras.length) {
                currentCameraIndex = cameras.indexOf(currentCameraIndex + 1);
            } else {
                currentCameraIndex = 0;
            }

            scanner.start(cameras[currentCameraIndex]);

            if (cameras.length > 1) {
                switchCameraBtn.style.display = "inline-block";
            }

        } else {
            alert("No cameras found.");
        }
    })
    .catch(function (e) {
        console.error(e);
    });

}

/* stopScanner()
 Stops the camera stream,
 hides the scanner section,
 and restores the QR button.
*/
function stopScanner() {
    if (scanner) {
        scanner.stop();
        scanner = null;
    }
    qrSection.style.display = "none";
    qrBtn.style.display = "inline-block";

    switchCameraBtn.style.display = "none";
}

/* showQrResult(content)
 Displays the scanned QR content.
 If the content starts with http/https,
 it is rendered as a clickable link.
 Otherwise, it is displayed as plain text.
*/
function showQrResult(content) {

    const check = content.trim();

    if (check.startsWith("http://") || check.startsWith("https://")) {
        messageEl.innerHTML = `
            QR Code Result: 
            <a href="${content}" target="_blank" rel="noopener noreferrer">
                ${content}
            </a>
        `;
    } else {
        messageEl.textContent = "QR Code Result: " + content;
    }
}

/*
 Switch camera button handler
 Cycles through available cameras
 and restarts scanner with the next camera.
*/
switchCameraBtn.addEventListener("click", () => {

    if (cameras.length > 1) {

        currentCameraIndex = (currentCameraIndex + 1) % cameras.length;

        scanner.stop();
        scanner.start(cameras[currentCameraIndex]);
    }
});

/* Answer History */
let answerHistory = [];

function addToHistory(question, userAnswer, result) {

    const historyItem = {
        questionText: question.questionText,
        questionType: question.questionType,
        userAnswer: userAnswer,
        correct: result.correct,
        skipped: result.skipped || false
    };

    answerHistory.unshift(historyItem); // добавляем в начало
    renderHistory();
}

function renderHistory() {

    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    answerHistory.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("history-item");

        if (item.skipped) {
            div.classList.add("skipped");
        } else if (item.correct) {
            div.classList.add("correct");
        } else {
            div.classList.add("wrong");
        }

        div.innerHTML = `
            <span><strong>Question:</strong> ${item.questionText}</span>
            <span><strong>Your Answer:</strong> ${item.userAnswer ?? "Skipped"}</span>
            <span><strong>Result:</strong> 
                ${item.skipped ? "Skipped" : item.correct ? "Correct" : "Wrong"}
            </span>
        `;

        historyList.appendChild(div);
    });
}