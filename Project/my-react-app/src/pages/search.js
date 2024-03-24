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
      const {p_id, p_name, p_email, p_b_date} = data

       // p_b_date is a Firestore Timestamp
      const dateObject = p_b_date.toDate(); // Convert Firestore Timestamp to JavaScript Date object
      const formattedDate = dateObject.toLocaleDateString(); // Format the date as a string to be readable as a JSON
      
      return { p_id, p_name,p_email,p_b_date: formattedDate};
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
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
              <div>p_id: {patient.p_id}</div>
              <div>p_name: {patient.p_name}</div>
              <div>p_email: {patient.p_email}</div>
              <div>p_b_date: {patient.p_b_date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
