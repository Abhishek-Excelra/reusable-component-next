import React from 'react'
import TabsLayout from './utils/TabsLayout';
import { useLocation } from 'react-router-dom';

const DashboardNew=()=> {
    const location = useLocation();
    const userDetails = location.state.user;
    return (
        <TabsLayout userDetails={userDetails}/>
    )
}

export default DashboardNew