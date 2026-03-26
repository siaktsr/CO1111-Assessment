const loader = document.querySelector('.loader');
loader.innerHTML = `<img src="../media/photo/pirate-hat.png" alt="Loading...">`;
export function showLoader() {
    loader.style.display = "flex";
    loader.classList.remove('loader-hidden');
}

export function hideLoader() {
    loader.classList.add('loader-hidden');

    setTimeout(() => {
        loader.style.display = "none";
    }, 300);
}