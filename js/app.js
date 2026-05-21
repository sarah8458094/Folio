console.log("Readly PWA läuft!");

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker registriert"))
        .catch(error => console.log("Fehler:", error));
}