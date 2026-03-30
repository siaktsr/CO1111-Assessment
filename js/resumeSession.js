function checkSession() {
    //get the session id
    const sessionID = localStorage.getItem("treasureHuntSession");

    //check if it doesnt exist display error
    if (!sessionID) {
       //displayError("No existing session ID");
       resumeButton.style.display = "none";
       //if it exists and user presses YES
    } else {

        const userAgreement = confirm("There is an existing Treasure Hunt Do you want to resume?");

        //redirect to questions for user to continue playing
        if (userAgreement) {
            window.location.href="../html/questions.html";
            //else do nothing
        } /* else {
            console.log("User Decided to not resume their previous session.");
        } */
    }
}

//get the button id
let resumeButton = document.getElementById("resumeSession");
//when pressed call checkSession Function
resumeButton.addEventListener("click", checkSession);
checkSession();