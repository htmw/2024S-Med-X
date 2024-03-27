import React from "react";
import { useLocation } from "react-router-dom";
import { db } from '../firebase'; // Import your Firebase configuration
import {collection, addDoc, Timestamp ,setDoc,doc} from 'firebase/firestore'
import { useAuth } from '../components/session/AuthContext';

const Report = () => {
  const { user } = useAuth();
  const location = useLocation();
  const result = location.state.result;
  const url = location.state.img;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Function to insert data into Firestore
  
  const addReportToFirestore = async (e) => {
    e.preventDefault()
    try {
      await setDoc(doc(db, 'X-ray','4'), {
        p_id: user.uid, // Insert user's UID as p_id
        xr_image: url, // Insert URL as xr_image
        scan_date: formattedDate, // Insert formatted date as scan_date
        medical_term: result // Insert result as medical_term
      })
   
    } catch (err) {
      alert(err)
    }
  }

  // Call the function to add report to Firestore
  // You can trigger this function on a button click event
  // For example, <button onClick={addReportToFirestore}>Add Report</button>

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
            <div className="text-customGreen font-normal font-['Inter']">{formattedDate}</div>{/* i want to insert this as scan_date*/}
          </div>
          <div className="self-stretch flex-col justify-start items-start flex">
            <div className="text-center text-customPurple text-3xl font-normal font-['Inter']">{result}</div>{/* i want to insert this as medical_term*/}
          </div>
          <div className="self-stretch flex-col justify-end items-end flex">
          <div className="DownloadReport  h-12 px-5 py-2.5 bg-black bg-opacity-20 rounded-lg justify-start items-start gap-2.5 inline-flex">
<button className="PrintReport text-center text-white text-2xl font-normal font-['Inter']"onClick={addReportToFirestore}>Submit Report</button>
</div>
          </div>
        
        </div>
      </div>
      
    </div>
  );
};

export default Report;
