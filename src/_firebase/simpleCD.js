import { getDatabase, ref, set } from "firebase/database";
const db = getDatabase();

export const simpleAdd = (path, obj) => {
    // firebaseDb.child(path).push(obj, (err) => {
    //     if (err) console.log(err);
    // });

    set(ref(db, path), obj);
};

// const simpleUpdate = (path, id, field, value) => {
//   const obj = { [field]: value };
//   firebaseDb.child(`${path}/${id}`).update(obj, (err) => {
//     if (err) console.log(err);
//   });
// };

// const simpleDelete = (path, id) => {
//   if (window.confirm("Are you sure to delete this record?")) {
//     firebaseDb.child(`${path}/${id}`).remove((err) => {
//       if (err) console.log(err);
//     });
//   }
// };

// const simpleDeleteNoConfirm = (path, id) => {
//   firebaseDb.child(`${path}/${id}`).remove((err) => {
//     if (err) console.log(err);
//   });
// };
