import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBv--T4G0RqeVOsVadYigyJVkEgcvvTIsg",
    authDomain: "folio-b7062.firebaseapp.com",
    projectId: "folio-b7062",
    storageBucket: "folio-b7062.firebasestorage.app",
    messagingSenderId: "180947237387",
    appId: "1:180947237387:web:d68969012557ce68f1250e"
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});

const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const user = {
        name: form.name.value,
        email: form.email.value
    };

    try {
        await addDoc(collection(db, "users"), user);
        console.log("User gespeichert");

        form.name.value = "";
        form.email.value = "";
    } catch (error) {
        console.log("Fehler beim Speichern:", error);
    }
});

const userContainer = document.querySelector(".users");

userContainer.addEventListener("click", async function (e) {
    if (e.target.classList.contains("delete")) {
        const id = e.target.getAttribute("data-id");
        await deleteDoc(doc(db, "users", id));
    }
});

onSnapshot(collection(db, "users"), function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
        const document = change.doc;

        if (change.type === "added") {
            renderUser(document.data(), document.id);
        }

        if (change.type === "removed") {
            removeUser(document.id);
        }
    });
});

function renderUser(data, id) {
    const html =`<div class="user-card">
            <div>
                <h3>${data.name}</h3>
                <p>${data.email}</p>
            </div>

            <button class="delete" data-id="${id}">
                Löschen
            </button>
        </div>`

    ;

    userContainer.insertAdjacentHTML("beforeend", html);
}

function removeUser(id) {
    const button = document.querySelector("[data-id='" + id + "']");
    const userCard = button.closest(".user-card");
    userCard.remove();
}
