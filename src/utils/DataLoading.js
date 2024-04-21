import React from 'react';
import { Grid } from '@mui/material';
const DataLoading = () => (
    <center>
        <Grid>
            <img src={`${window.location.origin}/waitLoading.gif`} alt="loading..." />
        </Grid>
    </center>
);

export default DataLoading;
