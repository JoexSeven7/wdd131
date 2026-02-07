document.addEventListener("DOMContentLoaded", () => {
    // Increment review counter in localStorage
    let reviewCount = Number(window.localStorage.getItem("reviewCount-ls")) || 0;
    reviewCount++;
    window.localStorage.setItem("reviewCount-ls", reviewCount);

    // Display the count
    const countDisplay = document.getElementById("reviewCount");
    if (countDisplay) {
        countDisplay.textContent = reviewCount;
    }

    // Footer: Current Year and Last Modified
    const yearSpan = document.getElementById("currentyear");
    const modSpan = document.getElementById("lastModified");
    
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modSpan) modSpan.textContent = `Last Modification: ${document.lastModified}`;
});