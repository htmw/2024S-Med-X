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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Patient'), (snapshot) => {
      const patients = snapshot.docs.map(doc => {
        // Extract multiple fields from each document
        const data = doc.data(); // Get all fields from the document
        const { p_id, p_name, p_email, p_b_date } = data


        // Check if p_b_date exists before calling toDate()
        const formattedDate = p_b_date ? p_b_date.toDate().toLocaleDateString() : '';


        return { p_id, p_name, p_email, formattedDate };
      });
      setPatientData(patients);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]); // Clear search results if searchTerm is empty
      return;
    }

    // Filter patientData based on searchTerm
    const results = patientData.filter(patient =>
      Object.values(patient).some(value =>
        value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults(results);
  }, [searchTerm, patientData]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-gray-800 Frame1 w-full h-full flex-col justify-center items-center gap-2.5 inline-flex text-white">
      <input
        type="text"
        placeholder="Search by ID..."
        value={searchTerm}
        onChange={handleChange}
        className="bg-gray-200 px-2 py-1 rounded"
      />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((patient, index) => (
            <li key={index}>
              <div>{patient.p_id}</div>
              <div>{patient.p_name}</div>
              <div>{patient.p_email}</div>
              <div>{patient.formattedDate}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
