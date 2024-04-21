import React from 'react'
import DataGridTable from '../utils/DataGridTable'
import axios from 'axios';

const columns = [
  { field: 'dataset_id', headerName: 'Dataset Id', width: 250 },
  { field: 'dataset_name', headerName: 'Dataset Name', width: 210 },
  { field: 'dataset_description', headerName: 'Dataset Description', width: 210 },
  { field: 'investigation_id', headerName: 'Investigation Id', width: 200 },
  { field: 'project_id', headerName: 'Project Name', width: 200 },
  { field: 'study_id', headerName: 'Study Id', width: 200 },
];

const reqDatasetAccess = async (variable) => {
  try {
    const response = await axios.post("http://13.200.179.225:8002/dataset-access", { ...variable });
    console.log('Request Dataset Response', response);
    response && window.alert('Request for new dataset submitted successfully')
    window.location.reload()
    // Redirect to dashboard on successful login
  } catch (error) {
    console.log("dataset access", error);
    // Handle login errors
  }
};

const UserNotAccessDB = (props) => {
  const rows = props.data.message === "No datasets found for this user." ?
  [] :
  props.data.map((d, index) => ({ id: index, ...d }));
  const dataGridProp = { checkboxSelection: true }
  const user_id = props.user_id
  const buttons = [{
    name: 'Submit',
    onClick: ((selectedRows) =>
      reqDatasetAccess({
        "user_id": user_id,
        "dataset_ids": selectedRows.map(d => d.dataset_id)
      })
    ),
    style: {
      margin: '20px 0px 0px 10px',
      border: '1px solid', borderRadius: '30px'
    },
  }];

  return (
    <DataGridTable {...{ rows, columns, dataGridProp, buttons }} />
  )
}


export default UserNotAccessDB