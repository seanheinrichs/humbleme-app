import React from 'react';

import Camera from 'react-html5-camera-photo';
import Typography from '@material-ui/core/Typography';
import NavBar from '../../components/navbar/navbar.component';
import { createMuiTheme } from '@material-ui/core/styles';

import 'react-html5-camera-photo/build/css/index.css';
import 'typeface-patrick-hand';

const HomePage = () => {

    const _handleTakePhoto = (dataUri) => {
        console.log(dataUri);
        fetch('http://localhost:3001/insults/list')
        .then(response => response.json())
        .then( responseJson => {
            alert(responseJson.data[0].insult);
        },
    )}

    return (
        <div className='homepage'>
            <Typography variant="h3">Humble Me</Typography>
            <NavBar />
            <Camera 
                onTakePhoto= { (dataUri) => { _handleTakePhoto(dataUri); } }
            />
        </div>
    );
};

export default HomePage;