export function displayError(error){
    let modal = document.getElementById("myModal");
    let text = document.querySelector("#myModal p");

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("closeModal")[0];

// x closes the modal and hides display
    span.onclick = function() {
        modal.style.display = "none";
    }

    //display the error mesage
    text.textContent = error;
    modal.style.display = "block";
}
