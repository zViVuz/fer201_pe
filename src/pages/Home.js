import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";

const URL = 'https://649911d179fbe9bcf83ea17c.mockapi.io/api/v1/staffManagement';

const Home = () => {

    const [staffs, setStaffs] = useState([]);
    const [detailPopup, setDetailPopup] = useState(null);


    const getListStaff = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setStaffs(res.data);
        }
    }

    useEffect(() => {
        getListStaff();
    }, []);

    // popup
    const handleViewPopup = (staff) => {
        setDetailPopup(staff);
    }

    const handleClosePopup = () => {
        setDetailPopup(null);
    }


    return (
        <div className="container">
            {staffs && staffs.map((staff) => (
                <div className="card" key={staff.id}>
                    <img src={staff.avatar} alt={staff.id} />
                    <h3>{staff.name}</h3>
                    <button onClick={() => handleViewPopup(staff)}>View Details</button>
                </div>
            ))}

            {detailPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <span className='close' onClick={handleClosePopup}>
                                &times;
                            </span>
                            <img src={detailPopup.avatar} alt={detailPopup.id} />
                            <h2>ID: {detailPopup.id}</h2>
                            <p>Name: {detailPopup.name}</p>
                            <p>Age: {detailPopup.age}</p>
                            <p>Address: {detailPopup.Address}</p>
                            <p>CreatedAt: {new Date(detailPopup.createdAt * 1000).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;