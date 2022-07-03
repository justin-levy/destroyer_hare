import { useState, useEffect } from "react";
import {} from "./firebase";

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

export const GetPlayingCards = (gameId) => {
    const [lizzie, setLizzie] = useState({});
    const [marie, setMarie] = useState({});
    const [justin, setJustin] = useState({});
    const dbRef1 = ref(db, `${gameId}/Lizzie/playingCard`);
    const dbRef2 = ref(db, `${gameId}/Marie/playingCard`);
    const dbRef3 = ref(db, `${gameId}/Justin/playingCard`);

    useEffect(() => {
        onValue(dbRef1, (snapshot) => {
            setLizzie(snapshot.toJSON());
        });
        onValue(dbRef2, (snapshot) => {
            setMarie(snapshot.toJSON());
        });
        onValue(dbRef3, (snapshot) => {
            setJustin(snapshot.toJSON());
        });
    }, [gameId]);

    return { lizzie, marie, justin };
};

export const GetBunnyCircle = (gameId) => {
    const [lizzie, setLizzie] = useState({});
    const [marie, setMarie] = useState({});
    const [justin, setJustin] = useState({});
    const dbRef1 = ref(db, `${gameId}/Lizzie/bunnies`);
    const dbRef2 = ref(db, `${gameId}/Marie/bunnies`);
    const dbRef3 = ref(db, `${gameId}/Justin/bunnies`);

    useEffect(() => {
        onValue(dbRef1, (snapshot) => {
            setLizzie(snapshot.toJSON());
        });
        onValue(dbRef2, (snapshot) => {
            setMarie(snapshot.toJSON());
        });
        onValue(dbRef3, (snapshot) => {
            setJustin(snapshot.toJSON());
        });
    }, [gameId]);

    return { lizzie, marie, justin };
};

export const GetDolla = (gameId, player) => {
    const [lizzie, setLizzie] = useState({});
    const [marie, setMarie] = useState({});
    const [justin, setJustin] = useState({});
    const dbRef1 = ref(db, `${gameId}/Lizzie/dolla`);
    const dbRef2 = ref(db, `${gameId}/Marie/dolla`);
    const dbRef3 = ref(db, `${gameId}/Justin/dolla`);

    useEffect(() => {
        if (player !== "Lizzie")
            onValue(dbRef1, (snapshot) => {
                setLizzie(snapshot.toJSON());
            });
        if (player !== "Marie")
            onValue(dbRef2, (snapshot) => {
                setMarie(snapshot.toJSON());
            });
        if (player !== "Justin")
            onValue(dbRef3, (snapshot) => {
                setJustin(snapshot.toJSON());
            });
    }, [gameId]);

    return { lizzie, marie, justin };
};

export const GetSpecial = (gameId, player) => {
    const [lizzie, setLizzie] = useState({});
    const [marie, setMarie] = useState({});
    const [justin, setJustin] = useState({});
    const dbRef1 = ref(db, `${gameId}/Lizzie/special`);
    const dbRef2 = ref(db, `${gameId}/Marie/special`);
    const dbRef3 = ref(db, `${gameId}/Justin/special`);

    useEffect(() => {
        if (player !== "Lizzie")
            onValue(dbRef1, (snapshot) => {
                setLizzie(snapshot.toJSON());
            });
        if (player !== "Marie")
            onValue(dbRef2, (snapshot) => {
                setMarie(snapshot.toJSON());
            });
        if (player !== "Justin")
            onValue(dbRef3, (snapshot) => {
                setJustin(snapshot.toJSON());
            });
    }, [gameId]);

    return { lizzie, marie, justin };
};