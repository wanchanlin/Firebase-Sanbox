 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 import{
    getDatabase,
    ref,
    child,
    get,
    push,
    set, 
    onValue,
    serverTimestamp
 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyCjsHqj8VYXkGJZ0DsPerf9_NV9uz509Wc",
   authDomain: "humber-demo-wanchan.firebaseapp.com",
   projectId: "humber-demo-wanchan",
   storageBucket: "humber-demo-wanchan.firebasestorage.app",
   messagingSenderId: "131658774307",
   appId: "1:131658774307:web:f277add8c2447545bebe96"
 };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the Realtime Database
const database = getDatabase();

// Fetch the messages collection
const messages = ref(database, "/messages");

// When the messages collection changes
onValue(
    messages,
    (snapshot) => {

        // Create a reference to the list
        const ul = document.getElementById('messages');
         ul.replaceChildren();

        // Loop through our messages collection
        snapshot.forEach((childSnapshot) => {

            // Get record data
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childKey);
            console.log(childData);
            const text = document.createTextNode(
                childData.message +"~"+ childData.name
            ); 
            const li = document.createElement("li");
            li.appendChild(text);
            ul.appendChild(li);

        })
    },
    {
        onlyOnce: false,
    }
);
const add = document.getElementById('add');
add.addEventListener('click', (e) => {
    const name = document.getElementById('name');
    const message = document.getElementById('message');
    const newMessage = push(messages);
    set(newMessage, {
        name: name.value,
        message: message.value,
        createdAt: serverTimestamp(),
    });

    e.preventDefault();
    ;});              