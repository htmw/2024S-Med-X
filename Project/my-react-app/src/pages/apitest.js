import React, { useState, useEffect } from 'react';

const APItest = () => { //testing Python API in react

    const [data, setData] = useState([{}]); //data array

    useEffect(() => { //fetch members API
        fetch("http://localhost:5001/members").then(
            res => res.json() //convert data into JSON
        ).then(data => { 
            setData(data) //pass data into constructor
            console.log(data)})
    }, [])

    return (
        <div>
            {(typeof data.members==='undefined') ? ( //if data is strictly undefined, run Loading... othersiwe map the array and print a paragrpah each time
                <p>Loading...</p>
            ) : (
                data.members.map((member, i) => (
                    <p key={i}>{member}</p>
                ))
            )}
        </div>
    );
};

export default APItest;