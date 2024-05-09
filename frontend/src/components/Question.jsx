import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const Question = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [numberOfWheels, setNumberOfWheels] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:3200/');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNext = () => {
        if (currentQuestion === 1 && (!firstName || !lastName)) {
            alert('Please provide your full name.');
            return;
        }
        if (currentQuestion === 2 && !numberOfWheels) {
            alert('Please select the number of wheels.');
            return;
        }
        if (currentQuestion === 3 && !vehicleType) {
            alert('Please select a vehicle type.');
            return;
        }
        setCurrentQuestion(currentQuestion + 1);
    };

    let questionComponent;
    switch (currentQuestion) {
        case 1:
            questionComponent = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div>
                        <h1>First, What's your name?</h1>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        {
                            currentQuestion < 3 &&
                            <Button variant="contained" color="primary" fullWidth onClick={handleNext}>
                                Next
                            </Button>
                        }

                    </div>
                </div>
            );
            break;
        case 2:
            questionComponent = (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <h3>Number of Wheels:</h3> {" "}
                    <input type="radio" value="2" checked={numberOfWheels === '2'} onChange={() => setNumberOfWheels('2')} />
                    <span>2</span>
                    <input type="radio" value="4" checked={numberOfWheels === '4'} onChange={() => setNumberOfWheels('4')} />
                    <span>4</span>
                </div>
            );
            break;
        case 3:
            questionComponent = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <h3>Vehicle Type:</h3>
                </div>
            );
            break;
        default:
            questionComponent = null;
    }

    return (
        <div>
            {questionComponent}
            {currentQuestion < 3 && <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>}
            {currentQuestion === 3 && <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>}
        </div>
    );
};

export default Question;