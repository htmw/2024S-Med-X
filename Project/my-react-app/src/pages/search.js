/*

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
  const [xrayData, setxrayData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'X-ray'), (snapshot) => {
      const xrays = snapshot.docs.map(doc => {
        // Extract multiple fields from each document
        const data = doc.data(); // Get all fields from the document
        const { medical_term, p_id, scan_date } = data
        const { id } = doc; // Get document ID

        // Check if scan_date is a Timestamp before calling toDate()
        const scan_formatted_Date = scan_date && typeof scan_date.toDate === 'function' ? scan_date.toDate().toLocaleDateString() : '';

        return { id, medical_term, p_id, scan_formatted_Date };
      });
      setxrayData(xrays);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]); // Clear search results if searchTerm is empty
      return;
    }

    // Filter patientData based on searchTerm
    const results = xrayData.filter(xray =>
      Object.values(xray).some(value =>
        value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) || xray.id.toLowerCase().includes(searchTerm.toLowerCase()) // Include document ID in search
    );
    setSearchResults(results);
  }, [searchTerm, xrayData]);

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
          {searchResults.map((xray, index) => (
            <li key={index}>
              <div>{xray.medical_term}</div>
              <div>{xray.p_id}</div>
              <div>{xray.scan_formatted_Date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
*/