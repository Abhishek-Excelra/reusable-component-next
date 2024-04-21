import React from 'react'
import DataGridTable from '../utils/DataGridTable'

const columns = [
    { field: 'dataset_id', headerName: 'Dataset Id', width: 200 },
    { field: 'dataset_name', headerName: 'Dataset Name', width: 130 },
    { field: 'dataset_description', headerName: 'Dataset Description', width: 200 },
    {
        field: 'request_date',
        headerName: 'Request Date',
        width: 130,
        valueGetter: (value) => value && new Date(value),
        type: 'date',
    },
    { field: 'request_status', headerName: 'Request Status', width: 130 },
    { field: 'project_id', headerName: 'Project Id', width: 200 },
    { field: 'investigation_id', headerName: 'Investigation Id', width: 200 },
    { field: 'study_id', headerName: 'Study Id', width: 200 },
    {
        field: 'approval_date',
        headerName: 'Approved Date',
        width: 130,
        valueGetter: (value) => value && new Date(value),
        type: 'date',
    },
    { field: 'approved_by', headerName: 'Approved By', width: 130 },
];

const UserAccessDB = (props) => {
    const rows = props.data.message === "No datasets found for this user." ?
        [] :
        props.data.map((d, index) => ({ id: index, ...d }));
    return (
        <DataGridTable {...{ rows, columns }} />
    )
}

export default UserAccessDB