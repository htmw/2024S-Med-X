import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //useLocation
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import StatusButton from '../components/button/StatusButton';
import { useAuth } from '../components/session/AuthContext';

const ReportGallery = () => {
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { user, userType } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/'); // Navigate to home if user is not logged in
            return;
        }

        const fetchReports = async () => {
            try {
                const reportsRef = collection(db, 'X-ray');
                let q;
                if (userType === 'doctor') {
                    // Fetch reports associated with the doctor
                    q = query(reportsRef);
                } else if (userType === 'patient') {
                    // Fetch reports associated with the patient
                    q = query(reportsRef, where("p_id", "==", user.uid));
                }
                const querySnapshot = await getDocs(q);
                const fetchedReports = [];
                querySnapshot.forEach((doc) => {
                    fetchedReports.push({ id: doc.id, data: doc.data() });
                });
                setReports(fetchedReports);
            } catch (error) {
                console.error("Error fetching reports:", error);
                // Handle error fetching reports
            }
        };

        fetchReports();
    }, [user, userType, navigate]); // Fetch reports whenever user, userType, or navigate changes

    // Calculate total number of pages
    const totalPages = Math.ceil(reports.length / 7);

    // Slice the reports array based on current page
    const startIndex = (currentPage - 1) * 7;
    const endIndex = currentPage * 7;
    const currentReports = reports.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleImageClick = (report) => {
        // Handle click event, for example, navigate to a detail page
        //const reportId = report;
        //navigate(`/reportdetails/${report.id}/${report.data.medical_term}`);

        navigate(`/reportdetails/${report}`);
    };

    return (
        <div className="Frame31 w-full h-full p-7 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="Report text-white text-5xl font-normal">Reports</div>
            <div className="Gallery flex justify-start items-start flex-wrap gap-2 p-2 ">
                {currentReports.map((report) => (
                    <div
                        key={report.id}
                        className="Frame34 flex-col justify-start items-center inline-flex gap-5 bg-primary p-5 rounded-[10px]"
                        onClick={() => handleImageClick(report.id)}
                        //onClick={() => navigate(`/reportdetails/${report.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="Frame32 w-32 h-48 flex-col justify-start items-center flex ">
                            <img
                                className="Image3 object-cover w-full h-full rounded-2xl"
                                src={report.data.xr_image}
                                alt="Report_image"
                            />
                        </div>
                        <div className="self-stretch justify-center items-center gap-5 inline-flex">
                            <StatusButton status={report.data.status} />
                        </div>
                        <div className="Frame33 justify-start items-center  inline-flex flex-col gap-1">
                            <div className="Details text-white text-base font-normal">#{report.id}</div>
                            <div className="Details text-customPurple text-base font-normal">
                                {report.data.medical_term}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            {/* Pagination controls */}
            <div className="w-full flex justify-center items-center text-white gap-3">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} >Next</button>
            </div>
        </div>
    );
};

export default ReportGallery;
