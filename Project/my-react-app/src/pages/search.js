import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVe1Rjk5oFHP57-ZRgG9nm-S62hZZQpd4",
  authDomain: "med-x-5f2b4.firebaseapp.com",
  databaseURL: "https://med-x-5f2b4-default-rtdb.firebaseio.com",
  projectId: "med-x-5f2b4",
  storageBucket: "med-x-5f2b4.appspot.com",
  messagingSenderId: "9302046680",
  appId: "1:9302046680:web:38444a4847e45702f664ad",
  measurementId: "G-LR1NET7P9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SearchBar = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'X-ray'), (snapshot) => {
      const patients = snapshot.docs.map(doc => doc.data());
      setPatientData(patients);
    });

    return () => unsubscribe();
  }, [db]);
  return (
    <div className="Frame1 w-full h-full flex-col justify-center items-center gap-2.5 inline-flex text-white">
      {patientData.map((patient, index) => (
        <div key={index}>
          {Object.entries(patient).map(([key, value]) => (
            <div key={key}>
              {key.replace(/_/g, ' ')}: {typeof value === 'object' ? JSON.stringify(value) : value}
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
