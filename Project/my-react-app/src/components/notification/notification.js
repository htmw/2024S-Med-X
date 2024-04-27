import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { useAuth } from '../../components/session/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const dropdownRef = useRef(null);
    const { user, userType } = useAuth();
const [notification, setNotification] = useState("");
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false); 
        }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);

  useEffect(() => {
    //if (user)

    const xrayRef = collection(db, "X-ray");
    const q = query(xrayRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const modifiedData = change.doc.data();
            const documentId = change.doc.id;
            if (change.type === "modified") {

                console.log (modifiedData)
                setNotification("comment:" + modifiedData.mp_comment + " report id:" + documentId);

                //console.log(notification);
            }
        });
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="relative h-full" ref={dropdownRef}>
        <div className="flex justify-center items-center gap-1 bg-neutral-900 rounded-full h-full p-1.5">
                <div />
                <IoIosNotifications
                    className="inline-flex justify-center items-center w-[50px] h-[50px] cursor-pointer"
                    style={{ fontSize: '30px', color: 'white' }}
                    onClick={toggleDropdown}
                />
                {hasChanges && (
                        <div style={{ position: 'absolute', top: '10px', right: '14px', width: '8px', height: '8px', borderRadius: '50%', background: 'red' }} />
                    )}
        </div>
        {isDropdownOpen && (
                <div className="absolute top-full right-2 mt-1  w-48 bg-primary shadow-lg rounded-lg">
                    <ul>
                        <li className="py-2 px-4 hover:bg-secondary rounded-lg text-white">
                            <p>
                               {notification}
                            </p>
                            <ul>
                                
                            </ul>
                        </li>
                    </ul>
                </div>
        )}
    </div>
  );
};

export default Notification 
