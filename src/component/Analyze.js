import React, { useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,
    Rating
} from '@mui/material';

const addAnalysis = async (variable, setShowRemark) => {
    try {
        const response = await axios.put("http://13.200.179.225:8002/analyze", { ...variable });
        console.log('Submit Analysis Report', response)
        response && setShowRemark(false);
        // Redirect to dashboard on successful login
    } catch (error) {
        console.log("dataset access", error);
        // Handle login errors
    }
};
const inputConfig = [
    { label: 'Dataset ID', key: 'dataset_id', disabled: true },
    { label: 'Dataset Name', key: 'dataset_name', disabled: false },
    { label: 'Dataset Description', key: 'dataset_description', disabled: false },
    { label: 'Project ID', key: 'project_id', disabled: true },
    { label: 'Investigation ID', key: 'investigation_id', disabled: true },
    { label: 'Study ID', key: 'study_id', disabled: true },
]
const dropDownConfig = [
    { label: 'Select Domain', key: 'domain_id', options: ['Genomics', 'Proteomics', 'Metabolomics', 'Transcriptomics'] },
    { label: 'Select Data Source', key: 'data_source_id', options: ['Geo', 'Array', 'Express'] }
]

const Analyze = ({ showRemark, setShowRemark, rowData }) => {
    const { dataset_id, dataset_name, dataset_description, creation_date, user_id } = rowData
    const initialState = {
        user_id,
        dataset_id,
        dataset_name,
        dataset_description,
        study_type: '',
        domain_id: null,
        data_source_id: null,
        analysis: '',
        rating: null,
    }
    const [variable, setVariable] = useState(initialState);

    const handleInputChange = (key, value) => {
        setVariable({ ...variable, [key]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addAnalysis(variable, setShowRemark)
    };

    const closeModal = () => {
        setShowRemark(false);
    };

    const button = [
        { label: 'Submit', func: handleSubmit },
        { label: 'Close', func: closeModal }
    ]

    return (
        showRemark && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30">
                <div className="min-h-screen flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-xl w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            View Dataset - {dataset_id}
                        </h3>
                        <br />
                        {
                            inputConfig.map(({ label, key, disabled }) => {
                                return <TextField
                                    label={label}
                                    variant="outlined"
                                    value={variable[key] ? variable[key] : rowData[key]}
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => !disabled && handleInputChange(key, event.target.value)}
                                    disabled={disabled} />;
                            })
                        }
                        <FormControl component="fieldset" margin="normal">
                            <RadioGroup
                                value={variable.study_type}
                                onChange={(event) => handleInputChange('study_type', event.target.value)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                <FormControlLabel value="I" control={<Radio />} label="Internal" />
                                <FormControlLabel value="E" control={<Radio />} label="External" />
                            </RadioGroup>
                        </FormControl>
                        {
                            dropDownConfig.map(({ label, key, options }) =>
                                <FormControl variant="outlined" fullWidth margin="normal">
                                    <InputLabel>{label}</InputLabel>
                                    <Select
                                        value={variable[key]}
                                        onChange={(event) => handleInputChange(key, event.target.value)}
                                        label={label}
                                    >
                                        {options.map((value, index) => <MenuItem value={index + 1}>{value}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            )
                        }

                        <textarea
                            value={variable.analysis}
                            onChange={(event) => handleInputChange('analysis', event.target.value)}
                            rows="4"
                            cols="158"
                            placeholder="Enter remark here..."
                            style={{ border: '1px solid', marginTop: '10px', padding: '10px', borderColor: '#c4c4c4', borderRadius: '4px' }}
                        />
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={variable.rating}
                                onChange={(event) => handleInputChange('rating', event.target.value)}
                            />
                        </Box>
                        <TextField
                            label="Created Date"
                            variant="outlined"
                            value={creation_date}
                            fullWidth
                            margin="normal"
                            disabled={true}
                        />
                        <br />
                        {
                            button.map(({ label, func }) =>
                                <button key={label}
                                    className="mt-4 py-2 ml-2 px-4 bg-blue-500 text-white rounded-md shadow-md focus:outline-none transition duration-300 hover:bg-blue-600"
                                    onClick={func}
                                >
                                    {label}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    );
};

export default Analyze;
