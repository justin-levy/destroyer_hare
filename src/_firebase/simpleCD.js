import { getDatabase, push, ref, remove, set, update } from "firebase/database";
import { getLength } from "../layout/utils";
const db = getDatabase();

export const simpleAdd = (path, obj) => {
    set(ref(db, path), obj);
};

export const simplePush = (path, obj) => {
    push(ref(db, path), obj);
};

export const simpleUpdate = (path, field, value) => {
    const obj = { [field]: value };

    // firebaseDb.child(`${path}/${id}`).update(obj, (err) => {
    //   if (err) console.log(err);
    // });

    update(ref(db, path), obj);
};

export const simpleDelete = (path) => {
    //   if (window.confirm("Are you sure to delete this record?")) {
    //     firebaseDb.child(`${path}/${id}`).remove((err) => {
    //       if (err) console.log(err);
    //     });
    //   }

    remove(ref(db, path));
};

export const takeCard = (gameId, gameState, pile) => {
    let cardToTake = {};
    const deckSize = getLength(gameState[pile]);
    const updatedPile = Object.entries(gameState[pile]).filter((card, idx) => {
        if (idx !== deckSize - 1) return card;
        else cardToTake = card;
    });
    simpleUpdate(`${gameId}/gameState`, pile, Object.fromEntries(updatedPile));
    return cardToTake;
};

// const simpleDeleteNoConfirm = (path, id) => {
//   firebaseDb.child(`${path}/${id}`).remove((err) => {
//     if (err) console.log(err);
//   });
// };
