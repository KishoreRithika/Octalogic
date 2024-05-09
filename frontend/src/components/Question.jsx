import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

const Question = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wheels, setwheels] = useState('');
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleTypeId, setvehicleTypeId] = useState('');
    const [vehicleModels, setVehicleModels] = useState([]);
    const [vehicleModelId, setVehicleModelId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const fetchVehicleTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3200/api/vehicle-types');
            setVehicleTypes(response.data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    };

    const fetchVehicleModels = async () => {
        try {
            const response = await axios.get('http://localhost:3200/api/vehicle-models');
            setVehicleModels(response.data);
        } catch (error) {
            console.error('Error fetching vehicle models:', error);
        }
    };

    const handleStartDateChange = (event) => {
        const date = event.target.value;
        setStartDate(new Date(date));
    };

    const handleEndDateChange = (event) => {
        const date = event.target.value;
        setEndDate(new Date(date));
    };

    useEffect(() => {
        fetchVehicleTypes();
        fetchVehicleModels();
    }, []);

    const handleSubmit = async () => {
        debugger;
        try {
            const formattedStartDate = startDate ? startDate.toISOString() : null;
            const formattedEndDate = endDate ? endDate.toISOString() : null;

            const requestData = {
                firstName,
                lastName,
                wheels,
                vehicleTypeId,
                vehicleModelId,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            };

            const response = await axios.post('http://localhost:3200/api/bookings', requestData);
            if (response.status === 200) {
                setFirstName('');
                setLastName('');
                setwheels('');
                setvehicleTypeId('');
                setVehicleModelId('');
                setStartDate(null);
                setEndDate(null);
                setCurrentQuestion(1);
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };


    const handleNext = () => {
        if (currentQuestion === 1 && (!firstName || !lastName)) {
            alert('Please provide your full name.');
            return;
        }
        if (currentQuestion === 2 && !wheels) {
            alert('Please select the number of wheels.');
            return;
        }
        if (currentQuestion === 3 && !vehicleTypeId) {
            alert('Please select a vehicle type.');
            return;
        }
        if (currentQuestion === 4 && !vehicleModelId) {
            alert('Please select a vehicle model.');
            return;
        }
        if (currentQuestion === 5 && (!startDate || !endDate)){
            alert("please choose dates.");
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
                            title='Enter first name'
                        />

                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            title='Enter last name'
                        />
                        <Button variant="contained" color="primary" fullWidth onClick={handleNext}
                        title='Click here to proceed'>
                            Next
                        </Button>
                    </div>
                </div>
            );
            break;
        case 2:
            questionComponent = (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <h3>Number of Wheels:</h3> {" "}
                    <input type="radio" value="2" checked={wheels === '2'} onChange={() => setwheels('2')} />
                    <span>2</span>
                    <input type="radio" value="4" checked={wheels === '4'} onChange={() => setwheels('4')} />
                    <span>4</span>
                    <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                </div>
            );
            break;
        case 3:
            questionComponent = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <h3>Vehicle Type:</h3>
                    {vehicleTypes.map(type => (
                        <div key={type.id}>
                            <input
                                type="radio"
                                value={type.id}
                                checked={vehicleTypeId === type.id}
                                onChange={() => setvehicleTypeId(type.id)}
                            />
                            <span>{type.name}</span>
                        </div>
                    ))}
                    <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                </div>
            );
            break;
        case 4:
            questionComponent = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <h3>Vehicle Model:</h3>
                    {vehicleModels.map(model => (
                        <div key={model.id}>
                            <input
                                type="radio"
                                value={model.id}
                                checked={vehicleModelId === model.id}
                                onChange={() => setVehicleModelId(model.id)}
                            />
                            <span>{model.name}</span>
                        </div>
                    ))}
                    <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                </div>
            );
            break;
        case 5:
            questionComponent = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <h3>Date Range:</h3>
                    <input type='date' onChange={handleStartDateChange} variant="inline" />
                    <br />
                    <input type='date' onChange={handleEndDateChange} variant="inline" />
                    <br />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </div>
            );
            break;
        default:
            questionComponent = null;
    }

    return (
        <div>
            {questionComponent}
        </div>
    );
};

export default Question;
