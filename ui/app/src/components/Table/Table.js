import React from 'react';
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';

function Table(props) {
    const classes = makeStyles({
      root: {
        fontSize: 16,
      },
    });
  
    return (
        <MaterialTable
            className = {classes.root}
            style = {{width:'95%', margin:'2rem'}}
            title = {props.title}
            data = {props.data}
            columns = {props.columns}
            options = {{ 
                search: false, 
                paging: true, 
                filtering: false, 
                exportButton: false,
                pageSize: 8,
                pageSizeOptions: [8, 16, 24],
                headerStyle: { backgroundColor: '#90cdf4', color: '#1a202c', fontSize: 16, padding: "16px 16px" },
                rowStyle: { fontSize: 14 }
            }}
        />
    );
  }
  
  export default Table;