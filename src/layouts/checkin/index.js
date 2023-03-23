
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Axios from "axios";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import moment from "moment/moment";
import Paper from "@mui/material/Paper";

function Checkin() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //--------filter 1--------------//
  // const [filteredData, setFilteredData] = useState(items);
  // const handleFilter = (searchTerm) => {
  //   const filteredResults = items.filter((item) => {
  //     return item.EmployeeID.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  //   setFilteredData(filteredResults);
  // };


  const [filterText, setFilterText] = useState('');
  const filteredData = items.filter((item) =>
    item.EmployeeID.toLowerCase().includes(filterText.toLowerCase())

  );

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText('');
  };

  //-------------------------//
  const columns = [
    {
      name: 'TransactionID',
      selector: row => row.TransactionID,
      width: '150px'
    },
    {
      name: 'EmployeeID',
      selector: row => row.EmployeeID,
      width: '200px'
    },
    {
      name: 'CheckInDate',
      selector: row => moment(row.CheckInDate).format('DD-MM-YYYY '),
      width: '250px'
    },
    {
      name: 'CheckInTime',
      selector: row => row.CheckInTime,
      width: '150px'
    },
    {
      name: 'Location',
      selector: row => row.Location,
      width: '250px'
    },
    {
      name: 'Model',
      selector: row => row.Model,
      width: '150px'
    }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/checkin")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Box display="flex">
          <Box sx={{ flexGrow: 2 }} >
            <div class="input-group col-lg-4" >
              <input type="text"
                className="form-control"
                placeholder="Search"
                value={filterText}
                onChange={handleFilter}
              >
              </input>
              <button
                className="btn btn-danger"
                onClick={handleClearFilter}
              >
                Clear
              </button>
            </div>

          </Box>
        </Box>

        <Paper sx={{ p: 1 }} style={{ backgroundColor: '#F2F3F4' }}>
          <div className="card-body" >

            <DataTable
              title="check-in"
              columns={columns}
              //data={items}
              data={filteredData}
              highlightOnHover
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 15, 25, 50]}
              paginationComponentOptions={{
                rowsPerPageText: 'Records per page:',
                rangeSeparatorText: 'out of',
              }}
            />
          </div>

        </Paper>
      </DashboardLayout>
    );
  }
}
export default Checkin;