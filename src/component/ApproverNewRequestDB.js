import React from 'react'
import DataGridTable from '../utils/DataGridTable'
import axios from 'axios';

const columns = [
  { field: 'request_id', headerName: 'Request Id', width: 150 },
  { field: 'username', headerName: 'User Name', width: 220 },
  { field: 'dataset_id', headerName: 'Dataset Id', width: 220 },
  { field: 'dataset_name', headerName: 'Dataset Name', width: 220 },
  {
    field: 'request_date',
    headerName: 'Access Request Date',
    width: 220,
    valueGetter: (value) => value && new Date(value),
    type: 'date',
  },
  { field: 'request_status', headerName: 'Access Status', width: 220 },
];

const updateDatasetAccess = async (variable) => {
  try {
    const response = await axios.put("http://13.200.179.225:8002/approver/update-dataset-access", { ...variable });
    console.log('Request Dataset Response', response);
    window.alert(`Request for new dataset ${variable.status}ed`)
    window.location.reload()
    // Redirect to dashboard on successful login
  } catch (error) {
    console.log("dataset access", error);
    // Handle login errors
  }
};
const textAreaBox = (remarks, setRemarks) => {
  const handleTextChange = (event) => {
    setRemarks(event.target.value);
  };
  return (
    <textarea
      value={remarks}
      onChange={handleTextChange}
      rows="4"
      cols="50"
      placeholder="Enter remark here..."
      style={{ border: '2px solid', marginTop: '10px', padding: '10px' }}
    />
  )
}
const ApproverNewRequestDB = (props) => {
  const dataGridProp = { checkboxSelection: true }
  const [remarks, setRemarks] = React.useState('');
  const rows = props.data.message === "No datasets found for this user." ?
    [] :
    props.data.map((d, index) => ({ id: index, ...d }));
  const user_id = props.user_id;
  const additionalComponent = textAreaBox(remarks, setRemarks)
  const buttons = [
    {
      name: 'Approve',
      onClick: ((selectedRows, remarks) =>
        updateDatasetAccess({
          "user_id": user_id,
          "request_ids": selectedRows.map(d => d.request_id),
          "status": "Accept",
          "remarks": remarks
        })
      ),
      disabled: remarks.length < 1,
      style: {
        margin: '20px 0px 0px 10px',
        border: '1px solid', borderRadius: '30px'
      },
    },
    {
      name: 'Reject',
      onClick: ((event) => updateDatasetAccess({
        "user_id": user_id,
        "request_ids": event.map(d => d.request_id),
        "status": "Reject",
        "remarks": ""
      })),
      disabled: remarks.length < 1,
      style: {
        margin: '20px 0px 0px 10px',
        border: '1px solid', borderRadius: '30px'
      },
    },
  ];

  return (
    <DataGridTable {...{ rows, columns, dataGridProp, buttons, additionalComponent, remarks }} />
  )
}

export default ApproverNewRequestDB