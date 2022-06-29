import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAZhXasqhbXPkwS4uLQbgbt7WNvZjQqmT4",
    authDomain: "bunnies-445d5.firebaseapp.com",
    databaseURL: "https://bunnies-445d5-default-rtdb.firebaseio.com",
    projectId: "bunnies-445d5",
    storageBucket: "bunnies-445d5.appspot.com",
    messagingSenderId: "1057017676157",
    appId: "1:1057017676157:web:2d78765fd7faacac2f4c14",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
