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
            showGameComplited();
            return;
        }
        renderQuestion(data);
    }catch(error){
        showMessage(error.message);
    }
}

/* renderQuestion
Renders question text and input controls based on question type.
*/
async function renderQuestion(question) {
    questionTextEl.textContent = question.questionText;
    questionTypeEl.textContent = `Type: ${question.questionType}`;

    renderAnswerInput(question.questionType);
}

/* renderAnswerInput
Renders input controls depending on question type.
*/
async function renderAnswerInput(type) {
    answerSectionEl.innerHTML = "";

    if(type === "BOOLEAN"){
        createButton("Yes/True", "true");
        createButton("No/False", "false");
    }

    if(type === "MCQ"){
        ["A", "B", "C", "D"].forEach(letter => {
            createButton(letter, letter);
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
    btn.onclick = () => submit(value);
    answerSectionEl.appendChild(btn);
}

/* Event Handlers */

submitBtn.addEventListener("click", ()=>{
    if(!currentQuestion)return;

    if(currentQuestion.questionType === "NUMERIC" 
    || currentQuestion.questionType === "INTEGER"){
        const input = document.getElementById("numeric-answer");
        if(!input || input.value === ""){
            showMessage("Please enter a number.")
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

        showMessage(result.message);

        loadQuestion();
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

    const btn = document.createElement("button");
    btn.textContent = "Go to Leaderboard";
    btn.onclick = () => {
        window.location.href = "leaderboard.html";
    };

    answerSectionEl.appendChild(btn);
}