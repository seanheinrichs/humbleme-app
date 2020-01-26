import React, { useState } from 'react';

import Camera from 'react-html5-camera-photo';
import Typography from '@material-ui/core/Typography';
import NavBar from '../../components/navbar/navbar.component';
import logo from '../../humble-logo.png';

import 'react-html5-camera-photo/build/css/index.css';

const HomePage = () => {
    
    const [message, setMessage] = useState('Take a photo!');
    const [isRoast, setIsRoast] = useState(false);

    const toggleRoast = () => setIsRoast(!isRoast)

    const _handleTakePhoto = (dataUri) => {
        fetch('http://localhost:3001/photo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                photo: dataUri,
                isRoast: isRoast
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            setMessage(responseJson.message);
        },
    )}

    return (
        <>
        <img src={logo} alt="Logo" />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div className='homepage'>
                <NavBar onToggle={toggleRoast} />
                <Camera 
                    onTakePhoto= { (dataUri) => { _handleTakePhoto(dataUri); } }
                />
            </div>
        </div>
            <Typography variant="h4" >{message}</Typography>
        </>
    );
};

export default HomePage;