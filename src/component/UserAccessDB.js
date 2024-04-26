import React from 'react'
import DataGridTable from '../utils/DataGridTable'
import { GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import Preview from './Preview';
import downloadJSON from '../utils/downloadJSON';
import DescriptionIcon from '@mui/icons-material/Description';
import Analyze from './Analyze';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
const fetchUserViewDataset = async (variable) => {
    try {
        const response = await axios.post("http://13.200.179.225:8002/view", { ...variable });

        return response
    } catch (error) {
        console.log("dataset access", error);
    }
};
const actionColConfig = [
    { label: 'Preview', icon: <VisibilityIcon />, disable: false },
    { label: 'Download', icon: <DownloadIcon />, disable: true },
    { label: 'Analyze', icon: <DescriptionIcon />, disable: true }
]
const UserAccessDB = (props) => {
    const [viewAPIVariable, setViewAPIVariable] = React.useState({});
    const [rowData, setRowData] = React.useState({});
    const [showPreview, setShowPreview] = React.useState(false);
    const [showRemark, setShowRemark] = React.useState(false);
    const rows = props.data.message === "No datasets found for this user." ?
        [] :
        props.data.map((d, index) => ({ id: index, ...d }));

    const actionFunct = React.useMemo(() => ({
        'Preview': ({ variable, row }) => {
            setViewAPIVariable(variable);
            setRowData(row);
            setShowPreview(true);
        },
        'Download': ({ variable, dataset_id }) => {
            fetchUserViewDataset(variable).then(data => {
                downloadJSON(data, dataset_id);
            });
        },
        'Analyze': ({ row }) => {
            setRowData(row);
            setShowRemark(true);
        }
    }), [setViewAPIVariable, setShowPreview, setShowRemark]);

    const action = React.useCallback(
        (params, type) => () => {
            const row = params.row
            const { dataset_id, project_id, study_id, investigation_id } = row;
            const variable = { dataset_id, project_id, study_id, investigation_id }
            actionFunct[type]({ variable, dataset_id, row })
        },
        [actionFunct]
    );


    const columns = [
        { field: 'dataset_id', headerName: 'Dataset Id', width: 200 },
        { field: 'dataset_name', headerName: 'Dataset Name', width: 200 },
        { field: 'dataset_description', headerName: 'Dataset Description', width: 200 },
        { field: 'project_id', headerName: 'Project Id', width: 200 },
        { field: 'investigation_id', headerName: 'Investigation Id', width: 200 },
        { field: 'study_id', headerName: 'Study Id', width: 200 },
        {
            field: 'request_date',
            headerName: 'Request Date',
            width: 200,
            valueGetter: (value) => value && new Date(value),
            type: 'date',
        },
        { field: 'request_status', headerName: 'Request Status', width: 200 },
        {
            field: 'approval_date',
            headerName: 'Approved Date',
            width: 200,
            valueGetter: (value) => value && new Date(value),
            type: 'date',
        },
        { field: 'approved_by', headerName: 'Approved By', width: 200 },
        { field: 'metadata_standard_version', headerName: 'Metadata Standard Version', width: 200 },
        { field: 'source_name', headerName: 'Source Name', width: 200 },
        { field: 'domain_name', headerName: 'Domain Name', width: 200 },
        { field: 'standard_name', headerName: 'Standard Name', width: 200 },
        {
            field: 'actions',
            headerName: 'Action',
            type: 'actions',
            width: 80,
            getActions: (params) =>
                actionColConfig.map(({ label, icon, disable }) => (
                    <GridActionsCellItem
                        icon={icon}
                        label={label}
                        onClick={action(params, label)}
                        showInMenu
                        disabled={params.row.request_status === 'pending' ? disable : false}
                    />
                ))
        },
    ];

    return (showPreview ?
        <Preview
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            variable={viewAPIVariable}
            fetchUserViewDataset={fetchUserViewDataset}
            rowData={rowData}
        />
        :
        showRemark ?
            <Analyze
                showRemark={showRemark}
                setShowRemark={setShowRemark}
                rowData={rowData}
            />
            :
            <DataGridTable {...{ rows, columns }} />
    )
}

export default UserAccessDB