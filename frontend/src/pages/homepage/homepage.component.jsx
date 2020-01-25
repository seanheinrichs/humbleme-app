import React from 'react';

import Camera from 'react-html5-camera-photo';
import NavBar from '../../components/navbar/navbar.component';

import 'react-html5-camera-photo/build/css/index.css';

const HomePage = () => {
    
    const _handleTakePhoto = (dataUri) => {
        // Send this shit to the back end boi
        console.log(dataUri);
    }

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