import React from 'react';
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {db} from '../firebase'; // Import your Firebase configuration
import {collection, query, where, getDocs} from 'firebase/firestore';
import StatusButton from '../components/button/StatusButton';

import {useAuth} from '../components/session/AuthContext';
const ReportGallery = () => {
    const [reports, setReports] = useState([]);

    const {user} = useAuth();
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reportsRef = collection(db, 'X-ray');
                const q = query(reportsRef, where("p_id", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const fetchedReports = [];
                querySnapshot.forEach((doc) => {
                    fetchedReports.push({id: doc.id, data: doc.data()});
                });
                setReports(fetchedReports);
            } catch (error) {
                console.error("Error fetching reports:", error);
                // Handle error fetching reports
            }
        };

        fetchReports();
    }); // Fetch reports whenever user.uid changes

    return (
        <div
            className="Frame31 w-full h-full p-7 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="Report text-white text-5xl font-normal ">Reports</div>
            <div
                className="Gallery self-stretch grow shrink basis-0 p-5 justify-start items-start inline-flex gap-5">

                {
                    reports.map((report) => (
                        <div
                            key={report.id}
                            className="Frame34 flex-col justify-start items-center inline-flex gap-5 bg-primary p-5 rounded-[10px]">
                            <div className="Frame32 w-48 h-72 flex-col justify-start items-center flex ">
                                <img
                                    className="Image3 self-stretch grow shrink basis-0 rounded-2xl"
                                    src={report.data.xr_image}
                                    alt="Report Image"/>
                            </div>
                            <div className="Frame33 justify-start items-center  inline-flex flex-col gap-1">
                                <div className="Details text-white text-base font-normal ">
                                    #{report.id}</div>
                                <div className='text-emerald-300'>{
                                        report
                                            .data
                                            .scan_date
                                            .toDate()
                                            .toLocaleString()
                                    }</div>
                                <StatusButton status={report.data.status}/>

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
export default ReportGallery;