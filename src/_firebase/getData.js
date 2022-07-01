import { useState, useEffect } from "react";
import { database } from "./firebase";

import { getDatabase, ref, child, get, onValue } from "firebase/database";

const dbRef = ref(getDatabase());
const db = getDatabase();

export const GetAllData = (gameId) => {
    const [data, setData] = useState({});

    useEffect(() => {
        get(child(dbRef, `${gameId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setData({
                        ...snapshot.val(),
                    });
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [gameId]);

    return data;
};

export const GetGameState = (gameId) => {
    const [data, setData] = useState({});
    const dbRef = ref(db, `${gameId}/gameState`);

    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setData(snapshot.toJSON());
        });
    }, []);

    return data;
};

export const GetPlayerState = (gameId, player) => {
    const [data, setData] = useState({});
    const dbRef = ref(db, `${gameId}/${player}`);

    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setData(snapshot.toJSON());
        });
    }, [gameId, player]);

    return data;
};