console.log("Folio PWA läuft!");

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker registriert"))
        .catch(error => console.log("Fehler:", error));
}

function showPage(pageId) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);
    selectedPage.classList.add("active");
}