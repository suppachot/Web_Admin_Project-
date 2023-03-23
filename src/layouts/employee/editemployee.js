// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import data from './../tables/data/authorsTableData';
import TextField from '@mui/material/TextField';
import Item from "antd/es/list/Item";
import axios from 'axios';


function EditEmp() {
  const { employeeID } = useParams();

  const [employeedata, setemployeedata] = useState([]);


  

  //------------ปจ-----------------------------------------//
  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  //   fetch("http://localhost:5000/getemployee/" + employeeID, requestOptions)
  //     .then(response => response.json())
  //     .then(employeedata => setemployeedata(employeedata))
  //     .then(result => {
  //       if (result['Status Code'] === '200 OK') {
  //         setEmployeeID(result['EmployeeID'])
  //         setTitleName(result['TitleName'])
  //         setFirstName(result['FirstName'])
  //         setLastName(result['LastName'])
  //         setPhoneNumber(result['PhoneNumber'])
  //         setEmail(result['Email'])
  //         setDepartmentName(result['DepartmentName'])
  //         setRoleName(result['RoleName'])
  //         setCreateDate(result['CreateDate'])
  //         setCreateBy(result['CreateBy'])
  //         setUpdateDate(result['UpdateDate'])
  //         setUpdateBy(result['UpdateBy'])
  //       }
  //     })
  //     .catch(error => console.log('error', error));
  // }, [employeeID])
//***********************************/********************-----

  const [EmployeeID, setEmployeeID] = useState("");
  const [TitleName, setTitleName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [DepartmentName, setDepartmentName] = useState("");
  const [RoleName, setRoleName] = useState("");
  const [CreateDate, setCreateDate] = useState("");
  const [CreateBy, setCreateBy] = useState("");
  const [UpdateDate, setUpdateDate] = useState(new Date());
  const [UpdateBy, setUpdateBy] = useState("");

  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const getEmployeeID = async () => {
    const response = await Axios.get('http://localhost:5000/getemployee/'+employeeID);
    console.log(response);
    setEmployeeID(response.data[0].EmployeeID);
    setTitleName(response.data[0].TitleName);
    setFirstName(response.data[0].FirstName);
    setLastName(response.data[0].LastName);
    setPhoneNumber(response.data[0].PhoneNumber);
    setEmail(response.data[0].Email);
    setDepartmentName(response.data[0].DepartmentName);
    setCreateDate(response.data[0].CreateDate);
    setCreateBy(response.data[0].CreateBy);
    setUpdateDate(response.data[0].UpdateDate(new Date()));
    setUpdateBy(response.data[0].UpdateBy);
  };

  useEffect(() => {
    getEmployeeID();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:5000/employee/edit/" + EmployeeID, {
      EmployeeID: EmployeeID,
      TitleName: TitleName,
      FirstName: FirstName,
      LastName: LastName,
      PhoneNumber: PhoneNumber,
      Email: Email,
      DepartmentName: DepartmentName,
      RoleName: RoleName,
      CreateDate: CreateDate,
      CreateBy: CreateBy,
      UpdateDate: UpdateDate,
      UpdateBy: UpdateBy

    }).then((res) => {
      alert('Saved successfully.')
      navigate('/employee');
    }).catch((err) => {
      console.log(err.message)
    })
  }
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>

              <div className="card" style={{ "textAlign": "left" }}>
                <div className="card-body">

                  <div className="row">

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>EmployeeID</label>
                        <input required value={EmployeeID}
                          type="text"
                          id='EmployeeID'
                          disabled="disabled"
                          onChange={e => setEmployeeID(e.target.value)}
                          className="form-control">
                        </input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>TitleName</label><br></br>
                        <select
                          placeholder="select title"
                          id='TitleName'
                          value={TitleName}
                          onChange={e => setTitleName(e.target.value)}
                          className="form-select"
                        >
                          <option value=""selected>select Title</option>
                          <option value="นาย">นาย</option>
                          <option value="นาง">นาง</option>
                          <option value="นางสาว">นางสาว</option>
                        </select>

                        {/* <input required value={TitleName}
                        type="text"
                        id='TitleName'
                        onChange={e => setTitleName(e.target.value)}
                        className="form-control">
                      </input> */}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>FirstName</label>
                        <input required value={FirstName}
                          type="text"
                          id='FirstName'
                          onChange={e => setFirstName(e.target.value)}
                          className="form-control">
                        </input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>LastName</label>
                        <input value={LastName} type="text"
                          id='LastName'
                          onChange={e => setLastName(e.target.value)}
                          className="form-control">
                        </input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>PhoneNumber</label>
                        <input value={PhoneNumber} type="text"
                          id='PhoneNumber'
                          onChange={e => setPhoneNumber(e.target.value)}
                          className="form-control">
                        </input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input value={Email} type="email"
                          id='Email'
                          onChange={e => setEmail(e.target.value)}
                          className="form-control">
                        </input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>DepartmentName</label>
                        <select
                          placeholder="select Department"
                          id='DepartmentName'
                          value={DepartmentName}
                          onChange={e => setDepartmentName(e.target.value)}
                          className="form-select"
                        >
                          <option value=" " placeholder="select Department" selected>select Department</option>
                          <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                          <option value="ฝ่ายบัญชี">ฝ่ายบัญชี</option>
                          <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
                        </select>

                        {/* <input value={DepartmentName} type="text"
                        id='DepartmentName'
                        onChange={e => setDepartmentName(e.target.value)}
                        className="form-control">
                      </input> */}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>RoleName</label>
                        <select
                          id='RoleName'
                          placeholder="select Role"
                          value={RoleName}
                          onChange={e => setRoleName(e.target.value)}
                          className="form-select"
                        >
                          <option value="" placeholder="select Role" selected>select Role</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Employee">Employee</option>
                        </select>

                        {/* <input value={RoleName} type="text"
                        id='RoleName'
                        onChange={e => setRoleName(e.target.value)}
                        className="form-control">
                      </input> */}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>CreateDate</label>
                        <input value={CreateDate} type="datetime-local"
                          id='CreateDate'
                          onChange={e => setCreateDate(e.target.value)}
                          className="form-control">

                        </input>
                        {CreateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>CreateBy</label>
                        <input value={CreateBy} type="text"
                          id='CreateBy'
                          disabled="disabled"
                          onChange={e => setCreateBy(e.target.value)}
                          className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>UpdateDate</label>
                        <input value={UpdateDate} type="datetime-local"
                          id='UpdateDate'
                          onChange={e => setUpdateDate(e.target.value)}
                          className="form-control"></input>
                        {UpdateDate.length == 0 && validation && <span className="text-danger">Enter the date</span>}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>UpdateBy</label>
                        <input value={UpdateBy}
                          type="text"
                          id='UpdateBy'
                          onChange={e => setUpdateBy(e.target.value)}
                          className="form-control">
                        </input>
                      </div>
                    </div>

                    <Box display="flex">
                    <Box sx={{ flexGrow: 4 }}>
                      <div className="card-body col-lg-4" >
                        <Link to="/employee" className="btn btn-danger">Back</Link>
                      </div>
                    </Box>
                    <Box>
                      <div className="card-body col-lg-4" >
                        <button className="btn btn-success" type="submit">Update</button>
                      </div>
                    </Box>
                  </Box>

                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  export default EditEmp;