import { useState, useEffect } from "react";
import { database } from "./firebase";

import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());

export const GetAllData = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        get(child(dbRef, "12345"))
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
    }, []);

    return data;
};

// const GetData = (option) => {
//   const [values, setValues] = useState({});

//   useEffect(() => {
//     firebaseDb.child(option).on("value", (snapshot) => {
//       if (snapshot.val() != null) {
//         setValues({
//           ...snapshot.val(),
//         });
//       } else setValues({});
//     });
//   }, [option]);

//   return values;
// };

// const GetTitleFromClassificationId = (type, id) => {
//   const [groupingName, setGroupingName] = useState("");

//   useEffect(() => {
//     firebaseDb.child(`${type}/${id}/title`).on("value", (snapshot) => {
//       if (snapshot.val() != null) {
//         setGroupingName(snapshot.val());
//       }
//     });
//   }, [type, id]);

//   return groupingName;
// };

// const GetTitleFromPackageId = (id) => {
//   const [packageName, setPackageName] = useState("");

//   useEffect(() => {
//     firebaseDb.child(`packages/${id}/title`).on("value", (snapshot) => {
//       if (snapshot.val() != null) {
//         setPackageName(snapshot.val());
//       }
//     });
//   }, [id]);

//   return packageName;
// };

// const GetNameFromClientId = (clientId) => {
//   const [value, setValue] = useState("");

//   useEffect(() => {
//     firebaseDb.child(`contacts/${clientId}`).on("value", (snapshot) => {
//       if (snapshot.val() != null) {
//         setValue(`${snapshot.val().first} ${snapshot.val().last}`);
//       }
//     });
//   }, [clientId]);

//   return value;
// };

// const GetClientsUnderClassification = (type, id) => {
//   const [options, setOptions] = useState({});

//   useEffect(() => {
//     firebaseDb.child(`${type}/${id}/clients`).on("value", (snapshot) => {
//       if (snapshot.val() != null) {
//         setOptions({
//           ...snapshot.val(),
//         });
//       }
//     });
//   }, [type, id]);

//   return options;
// };

// const GetEmailsUnderClassification = (type, id) => {
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     firebaseDb.child(`${type}/${id}/clients`).on("value", (snapshot) => {
//       if (snapshot.val() != null) {
//         Object.keys(snapshot.val()).map((item) =>
//           firebaseDb.child(`contacts/${item}/email`).on("value", (email) => {
//             setOptions((options) => [...options, email.val()]);
//           })
//         );
//       }
//     });
//   }, [type, id]);

//   return options;
// };
