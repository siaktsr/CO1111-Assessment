const loader = document.querySelector('.loader');
loader.innerHTML = `<img src="../media/photo/pirate-hat.png" alt="Loading...">`;
// Function to show the loader
export function showLoader() {
    loader.style.display = "flex";
    loader.classList.remove('loader-hidden');
}
// Function to hide the loader
export function hideLoader() {
    loader.classList.add('loader-hidden');

    setTimeout(() => {
        loader.style.display = "none";
    }, 300);
}