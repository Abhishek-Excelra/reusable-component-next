import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Grid } from '@mui/material';

const addHeaderColor = (columns) => (columns.map(column =>
  ({ headerClassName: 'super-app-theme--header', ...column })
))

const DataGridTable = ({ rows, columns, dataGridProp, buttons, additionalComponent, remarks }) => {
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <Box sx={{
      height: 400, width: '100%',
      '& .super-app-theme--header': {
        backgroundColor: '#e5e7eb',
        color: '#1976d2',
        fontSize: '1rem',
      },
    }}>
      <DataGrid
        {...{
          rows: rows,
          columns: addHeaderColor(columns),
          initialState: {
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          },
          pageSizeOptions: [5, 10],
          disableRowSelectionOnClick: true,
          onRowSelectionModelChange: (ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) =>
              selectedIDs.has(row.id),
            );
            setSelectedRows(selectedRows);
          },
          ...dataGridProp,
        }}
      />
      {additionalComponent}
      <Grid container>
        {buttons && <Grid item xs={6} md={6}>
          {buttons.map((button, index) =>
            <Button key={index} onClick={() => button.onClick(selectedRows, remarks)}
              style={{ ...button.style }}
              disabled={button.disabled || selectedRows.length<1}>
              {button.name}
            </Button>)}
        </Grid>}
      </Grid>
    </Box>
  );
}
export default DataGridTable;