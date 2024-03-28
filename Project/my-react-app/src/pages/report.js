import React from "react";
import { useLocation } from "react-router-dom";
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';

import { Timestamp } from "firebase/firestore";

const Report = () => {
  const { user } = useAuth();
  const location = useLocation();
  const result = location.state.result;
  const url = location.state.img;

  // Get the current date and time
  const currentDate = new Date();
  
  // Create a Firestore Timestamp object from the current date
  const formattedDate = Timestamp.fromDate(currentDate);

  // Function to insert data into Firestore
  const addReportToFirestore = async (e) => {
    e.preventDefault();
    try {
      // Fetch the number of existing reports
      const reportsRef = collection(db, 'X-ray');
      const reportsSnapshot = await getDocs(reportsRef);
      const numReports = reportsSnapshot.size;

      // Generate the next report ID
      const nextReportId = String(numReports).padStart(5, '0');

      // Construct the document path and set the data
      const reportDocRef = doc(db, 'X-ray', nextReportId);
      await setDoc(reportDocRef, {
        p_id: user.uid,
        xr_image: url,
        scan_date: formattedDate,
        medical_term: result,
        status:"0",
        mp_comment:"",
        mp_id:"",
        mp_review_date:"",
        medical_description:"",
        h_id:""
      });

      console.log("Report added successfully to Firestore.");
    } catch (err) {
      console.error("Error adding report to Firestore:", err);
      alert(err);
    }
  };

  return (
    <div className="h-full flex-col inline-flex gap-10 pl-5 pr-5 pt-5">
      <div className='flex-col items-start inline-flex gap-5'>
        <div className="text-center text-white text-4xl font-normal font-['Inter']">Report</div>
      </div>
      <div className="justify-center items-center gap-10 inline-flex p-5">
        <div className="self-stretch flex-col justify-start items-start inline-flex">
          <div className="flex-col justify-center items-start gap-5 flex w-[200px] h-[300px]">
            <img
              className="rounded-[10px] object-cover w-full h-full"
              src={url}//want to insert this in as xr_image
              alt="Placeholder" />
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
          <div className="w-1/2 self-stretch h-12 justify-between items-center inline-flex">
            <div className="text-center text-white text-xl font-normal font-['Inter']">Results</div>
            <div className="text-customGreen font-normal font-['Inter']">{formattedDate.toDate().toLocaleString()}</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start flex">
            <div className="text-center text-customPurple text-3xl font-normal font-['Inter']">{result}</div>
          </div>
          <div className="self-stretch flex-col justify-end items-end flex">
            <div className="DownloadReport  h-12 px-5 py-2.5 bg-black bg-opacity-20 rounded-lg justify-start items-start gap-2.5 inline-flex">
              <button className="PrintReport text-center text-white text-2xl font-normal font-['Inter']" onClick={addReportToFirestore}>Submit Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
