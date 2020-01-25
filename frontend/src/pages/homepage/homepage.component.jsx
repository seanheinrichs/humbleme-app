import React from 'react';

import Camera from 'react-html5-camera-photo';
import NavBar from '../../components/navbar/navbar.component';

import 'react-html5-camera-photo/build/css/index.css';

const HomePage = () => {

    const _handleTakePhoto = (dataUri) => {
        fetch("http://localhost:3001/insults/list")
        .then(response => response.json())
        .then( responseJson => {
            console.log(responseJson);
            alert(responseJson.data[0].insult);
        },
    )}

    return (
        <div className='homepage'>
            <NavBar />
            <Camera 
                onTakePhoto= { (dataUri) => { _handleTakePhoto(dataUri); } }
            />
        </div>
    );
};

export default HomePage;