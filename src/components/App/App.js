// App component to list Products
import React, { useState, useEffect, forwardRef } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'
//Material UI icons and plugins.
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function App() {

  const [ticketData, setTicket] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Product name',
      width: 150,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 100,
    },
    {
      field: 'unitPrice',
      headerName: 'Unit Price',
      description: 'Unit price column',
      width: 150
    },
  ];

  const handleRowUpdate = (updatedTicket, existingTickets, resolve) => {
    const  updatedTicketItems =   existingTickets.map((data, key) => data.id === updatedTicket.id ? updatedTicket : data);
    setTicket(oldTickets => [...oldTickets, updatedTicketItems]);
    resolve()
  }

  const handleRowAdd = (newTickets, resolve) => {
      setTicket(oldTickets => [...oldTickets, newTickets]);
      resolve()
  }

  const handleRowDelete = (oldData, resolve) => {
    const removedItems = ticketData.filter((row, idx) => row.id !== oldData.id);
    setTicket(removedItems);
    resolve()
  }

  useEffect(() => {

      fetch('/ticket').then(async tickets => {
        if (tickets.status === 200) {
          return await tickets.json();
        }
      }).then(ticket => {
        const formatData = ticket.map((ticketsList, idx) => {
        const uniquekey = {"id": idx+1};
        return {
          ...uniquekey,
          ...ticketsList
        }
      })
        setTicket(formatData);
    })
  }, [setTicket]);
  
    return (
      <div style={{ height: 900, width: '100%' }}>
         <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <MaterialTable
              title="Listing Tickets"
              columns={columns}
              data={ticketData}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
    );
}

export default App;
